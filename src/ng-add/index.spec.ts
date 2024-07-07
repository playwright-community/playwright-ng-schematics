import * as path from 'node:path';
import {
  SchematicTestRunner,
  type UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { beforeEach, describe, expect, it } from 'vitest';

describe('ng-add', () => {
  const runner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, '../../lib/collection.json'),
  );
  let appTree: UnitTestTree;

  beforeEach(async () => {
    appTree = await runner.runExternalSchematic(
      '@schematics/angular',
      'ng-new',
      {
        name: 'sandbox',
        directory: '.',
        version: '18.0.0',
      },
    );
  });

  it('should add npm script', async () => {
    const tree = await runner.runSchematic('ng-add', {}, appTree);

    const packageJSON = JSON.parse(tree.readContent('/package.json'));
    expect(packageJSON.scripts.e2e).toBe('playwright test');
  });

  it('should update .gitignore', async () => {
    const tree = await runner.runSchematic('ng-add', {}, appTree);

    const gitignore = tree.readContent('/.gitignore');
    expect(gitignore).toContain('# Playwright');
  });

  it('should add files and update devDependencies', async () => {
    const tree = await runner.runSchematic('ng-add', {}, appTree);

    expect(tree.files).toContain('/playwright.config.ts');
    expect(tree.files).toContain('/e2e/example.spec.ts');

    const packageJSON = JSON.parse(tree.readContent('/package.json'));
    expect(packageJSON.devDependencies['@playwright/test']).toBeTruthy();
  });
});
