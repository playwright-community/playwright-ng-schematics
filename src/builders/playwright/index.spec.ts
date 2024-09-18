import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { schema } from '@angular-devkit/core';

jest.mock('node:child_process');

describe('Playwright builder', () => {
  let architect: Architect;

  beforeEach(async () => {
    const architectHost = new TestingArchitectHost();
    architect = new Architect(architectHost);
    await architectHost.addBuilderFromPackage(join(__dirname, '../../..'));
  });

  it('should spawn testing process', async () => {
    const run = await architect.scheduleBuilder(
      'playwright-ng-schematics:playwright',
      {},
    );

    await run.result;
    await run.stop();

    expect(spawnSync).toHaveBeenCalledWith(
      'npx playwright test',
      [],
      expect.anything(),
    );
  });

  it('should accept --ui option', async () => {
    const run = await architect.scheduleBuilder(
      'playwright-ng-schematics:playwright',
      { ui: true },
    );

    await run.result;
    await run.stop();

    expect(spawnSync).toHaveBeenCalledWith(
      'npx playwright test',
      ['--ui'],
      expect.anything(),
    );
  });
});
