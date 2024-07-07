import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function e2e(_options: any): Rule {
  const name = _options.name;
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      applyTemplates({ classify, name, dasherize }),
      move('e2e'),
    ]);

    const rule = chain([mergeWith(templateSource)]);

    return rule(tree, _context);
  };
}
