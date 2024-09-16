/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  rootDir: 'src',
  testPathIgnorePatterns: ['<rootDir>.*/files/'],
  transform: {
    '^.+.ts$': ['ts-jest', {}],
  },
};
