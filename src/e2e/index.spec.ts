import * as path from 'node:path';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { describe, expect, it } from 'vitest';

const collectionPath = path.join(__dirname, '../../lib/collection.json');

describe('e2e', () => {
  it('should generate spec file', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematic(
      'e2e',
      { name: 'hello' },
      Tree.empty(),
    );

    expect(tree.files).toEqual(['/e2e/hello.spec.ts']);
    expect(tree.readContent('/e2e/hello.spec.ts')).toMatchSnapshot();
  });
});
