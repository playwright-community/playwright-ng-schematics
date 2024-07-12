import { spawnSync } from 'node:child_process';
import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function installBrowsers(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Install browsers');

    spawnSync('npx playwright install', [], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    });

    return tree;
  };
}