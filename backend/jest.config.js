export default {
    testTimeout: 10000,
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testMatch: ['**/tests/unit-integration/**/*.test.js'],
};
