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
    validUser: {
        id: 2,
        name: 'Juan Perez',
        role: 'Cajero',
    },
    nonExistentUser: {
        id: 999,
    },
};

export const accounts = {
    account1: {
        id: 1,
        account_number: '1000000001',
        currency: 'Quetzales y Dólares',
        balance: 6119.25,
        account_type: 'Ahorro',
        user: {
            id: 1,
            name: 'Carlos Pérez',
            email: 'carlos.perez@example.com',
            signature_path: 'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/test_men.jpg',
        },
    },
    account2: {
        id: 2,
        account_number: '1000000002',
        currency: 'Quetzales y Dólares',
        balance: 2301.00,
        account_type: 'Ahorro',
        user: {
            id: 2,
            name: 'Ana López',
            email: 'updated_email2@example.com',
            signature_path: 'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/61186680-ab03-40a2-bad1-9928552df335-MaoMao.jpg',
        },
    },
    account3: {
        id: 3,
        account_number: '2000000001',
        currency: 'Quetzales',
        balance: 1200.00,
        account_type: 'Monetario',
        user: {
            id: 3,
            name: 'Luis Gómez',
            email: 'luis.gomez@example.com',
            signature_path: 'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/test_men.jpg',
        },
    },
    account4: {
        id: 4,
        account_number: '2000000002',
        currency: 'Dólares',
        balance: 1150.00,
        account_type: 'Monetario',
        user: {
            id: 4,
            name: 'María Rodríguez',
            email: 'maria.rodriguez@example.com',
            signature_path: 'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/test_woman.jpg',
        },
    },
    insufficientFundsAccount: {
        id: 7,
        account_number: '915942985',
        currency: 'Quetzales',
        balance: 200.00,
        account_type: 'Monetario',
        user: {
            id: 5,
            name: 'Luis Garcia',
            email: 'luisgagu9@gmail.com',
            signature_path: 'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/68ad7bbc-81c3-4876-9062-5c96ecd7a032-DiagramaEntidadRelacionV1.png',
        },
    },
};

// Endpoints
export const endpoints = {
    check: '/api/authenticator/check',
    validatePassword: '/api/authenticator/validate/password',
    validateFile: '/api/authenticator/validate/file',
    updateRole: '/api/user/role',
    withdrawal: '/api/withdrawal',
};

// Roles
export const roles = {
    allowed: ['Cajero', 'Atención al Cliente'],
    invalid: 'Administrador',
};
