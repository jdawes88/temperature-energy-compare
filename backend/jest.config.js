/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  setupFiles: [],
  moduleNameMapper: {},
  coverageReporters: ['json'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};