import type { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { spawnSync } from 'node:child_process';

export function installBrowsers(_options: any): Rule {
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
