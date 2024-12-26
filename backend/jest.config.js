export default {
    projects: [
      {
        displayName: 'unit',
        testEnvironment: 'node',
        testTimeout: 100000,
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
        testTimeout: 100000,
        moduleFileExtensions: ['js', 'json'],
        setupFiles: ['<rootDir>/jest.setup.integration.js'],
        transform: {
          '^.+\\.js$': 'babel-jest',
        },
        testMatch: ['**/tests/integration/**/*.test.js'],
      },
    ],
  };
  