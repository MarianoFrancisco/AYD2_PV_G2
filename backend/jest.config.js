export default {
  testTimeout: 100000,
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      moduleFileExtensions: ['js', 'json'],
      setupFiles: ['<rootDir>/jest.setup.unit.js'],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
      testMatch: ['**/tests/unit/**/*.test.js'],
      reporters: [
        'default',
        [
          'jest-junit',
          {
            outputDirectory: './test-reports/unit',
            outputName: 'junit.xml',
          },
        ],
      ],
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      moduleFileExtensions: ['js', 'json'],
      setupFiles: ['<rootDir>/jest.setup.integration.js'],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
      testMatch: ['**/tests/integration/**/*.test.js'],
      reporters: [
        'default',
        [
          'jest-junit',
          {
            outputDirectory: './test-reports/integration',
            outputName: 'junit.xml',
          },
        ],
      ],
    },
  ],
};
