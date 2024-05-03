import type { Config } from '@jest/types'

export const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testResultsProcessor: 'jest-sonar-reporter',
  coveragePathIgnorePatterns:[
    './src/routes.ts'
  ]
}
export default config
