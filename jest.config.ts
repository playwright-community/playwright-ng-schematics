import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  testEnvironment: 'node',

  rootDir: 'src',
  testPathIgnorePatterns: ['<rootDir>.*/files/'],
  transform: {
    '^.+.ts$': ['ts-jest', {}],
  },
};

export default config;
