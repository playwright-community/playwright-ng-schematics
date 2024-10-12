import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';

jest.mock('node:child_process');

describe('Playwright builder', () => {
  let architect: Architect;

  beforeEach(async () => {
    const architectHost = new TestingArchitectHost();
    await architectHost.addBuilderFromPackage(join(__dirname, '../../..'));
    architect = new Architect(architectHost);

    (spawnSync as jest.Mock).mockReturnValue({ status: 0 });
  });

  it('should spawn testing process', async () => {
    const run = await architect.scheduleBuilder(
      'playwright-ng-schematics:playwright',
      {},
    );
    await run.stop();
    const output = await run.result;

    expect(output.success).toBeTruthy();
    expect(spawnSync).toHaveBeenCalledWith(
      'npx playwright test',
      [],
      expect.anything(),
    );
  });

  it('should fail on error', async () => {
    (spawnSync as jest.Mock).mockReturnValue({ status: -3 });

    const run = await architect.scheduleBuilder(
      'playwright-ng-schematics:playwright',
      {},
    );
    await run.stop();
    const output = await run.result;

    expect(output.success).toBeFalsy();
  });

  it('should accept --ui option', async () => {
    const run = await architect.scheduleBuilder(
      'playwright-ng-schematics:playwright',
      { ui: true },
    );
    await run.stop();
    const output = await run.result;

    expect(spawnSync).toHaveBeenCalledWith(
      'npx playwright test',
      ['--ui'],
      expect.anything(),
    );
    expect(output.success).toBeTruthy();
  });
});
