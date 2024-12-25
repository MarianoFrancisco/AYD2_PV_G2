// User simuled data
export const users = {
    cashier: {
        username: 'juanperez',
        email: 'juan.perez@example.com',
        password: '1234',
        hashedPassword: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    },
    customerService: {
        username: 'analopez',
        email: 'ana.lopez@example.com',
        password: '1234',
        hashedPassword: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    },
    supervisor: {
        username: 'luisrodriguez',
        email: 'luis.rodriguez@example.com',
        password: '1234',
        hashedPassword: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
        secondFactorFile: 'hashedSecondPassword',
    },
    admin: {
        username: 'mariagarcia',
        email: 'maria.garcia@example.com',
        password: '1234',
        hashedPassword: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
        secondPassword: 'correctSecondPassword',
        hashedSecondPassword: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    },
};

// Endpoints
export const endpoints = {
    check: '/api/authenticator/check',
    validatePassword: '/api/authenticator/validate/password',
    validateFile: '/api/authenticator/validate/file',
};
