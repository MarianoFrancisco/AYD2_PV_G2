export default {
    testTimeout: 10000,
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testMatch: ['**/tests/unit/**/*.test.js'],
};
