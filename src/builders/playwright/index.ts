import { spawn } from 'node:child_process';
import {
  type BuilderContext,
  type BuilderOutput,
  type BuilderRun,
  createBuilder,
  targetFromTargetString,
} from '@angular-devkit/architect';
import type { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
  devServerTarget: string;
  debug: boolean;
  trace: string;
  'update-snapshots': boolean;
  ui: boolean;
}

function buildArgs(options: Options) {
  const args = [];
  if (options.debug) {
    args.push('--debug');
  }
  if (options.trace) {
    args.push('--trace', options.trace);
  }
  if (options['update-snapshots']) {
    args.push('--u');
  }
  if (options.ui) {
    args.push('--ui');
  }
  return args;
}

async function startDevServer(
  context: BuilderContext,
  devServerTarget: string,
): Promise<BuilderRun> {
  const target = targetFromTargetString(devServerTarget);
  const server = await context.scheduleTarget(target, {});

  return server;
}

async function startPlaywrightTest(options: Options, baseURL: string) {
  // PLAYWRIGHT_TEST_BASE_URL is actually a non-documented env variable used
  // by Playwright Test.
  // Its usage in playwright.config.ts is to clarify that it can be overriden.
  let env = process.env;
  if (baseURL) {
    env = {
      PLAYWRIGHT_TEST_BASE_URL: baseURL,
      ...process.env,
    };
  }

  return new Promise((resolve, reject) => {
    const childPorcess = spawn('npx playwright test', buildArgs(options), {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
      env,
    });

    childPorcess.on('exit', (exitCode) => {
      if (exitCode !== 0) {
        reject(exitCode);
      }
      resolve(true);
    });
  });
}

async function runE2E(
  options: Options,
  context: BuilderContext,
): Promise<BuilderOutput> {
  let server: BuilderRun | undefined = undefined;
  let baseURL = '';

  try {
    if (options.devServerTarget) {
      server = await startDevServer(context, options.devServerTarget);
      const result = await server.result;
      baseURL = result.baseUrl;
    }

    await startPlaywrightTest(options, baseURL);
    return { success: true };
  } catch (error) {
    return { success: false };
  } finally {
    if (server) {
      server.stop();
    }
  }
}

export default createBuilder(runE2E);
