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
      },
      {
        displayName: 'acceptance',
        testEnvironment: 'node',
        moduleFileExtensions: ['js', 'json'],
        setupFiles: ['<rootDir>/jest.setup.acceptance.js'],
        transform: {
          '^.+\\.js$': 'babel-jest',
        },
        testMatch: ['**/tests/acceptance/**/*.test.js'],
      },
    ],
  };
  