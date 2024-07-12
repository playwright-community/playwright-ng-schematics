import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  url,
  type Rule,
  type SchematicContext,
  type Tree,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
} from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function e2e(options: { name: string }): Rule {
  const name = options.name;
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      applyTemplates({ classify, name, dasherize }),
      move('e2e'),
    ]);

    const rule = chain([mergeWith(templateSource)]);

    return rule(tree, _context);
  };
}
