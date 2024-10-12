import { spawnSync } from 'node:child_process';
import {
  type BuilderContext,
  type BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import type { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
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

function runE2E(options: Options, _context: BuilderContext): BuilderOutput {
  const { status } = spawnSync('npx playwright test', buildArgs(options), {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
  });

  return { success: status === 0 };
}

export default createBuilder(runE2E);
