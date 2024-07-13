import { spawnSync } from 'node:child_process';
import {
  type BuilderContext,
  type BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';

function runE2E(_options: undefined, _context: BuilderContext): BuilderOutput {
  spawnSync('npx playwright test', [], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
  });

  return { success: true };
}

export default createBuilder(runE2E);
