// User simuled data
export const users = {
    testCashier: {
        id: 99996,
        name: 'Test Juan Pérez',
        role: 'Cajero',
        username: 'testjuanperez',
        email: 'test.juan.perez@example.com',
        password: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
        phone: '5551234567',
        age: 30,
        dpi_number: '9991234567891',
        photo_path: 'https://example.com/photography/test_men.jpg',
        signature_path: 'https://example.com/signature/test.png',
        gender: 'Masculino',
        marital_status: 'Soltero',
    },
    testCustomerService: {
        id: 99997,
        name: 'Test Ana López',
        role: 'Atención al Cliente',
        username: 'testanalopez',
        email: 'test.ana.lopez@example.com',
        password: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
        phone: '5559876543',
        age: 28,
        dpi_number: '9997654321091',
        photo_path: 'https://example.com/photography/test_woman.jpg',
        signature_path: 'https://example.com/signature/test.png',
        gender: 'Femenino',
        marital_status: 'Casado',
    },
    testSupervisor: {
        id: 99998,
        name: 'Test Luis Rodríguez',
        role: 'Supervisor',
        username: 'testluisrodriguez',
        email: 'test.luis.rodriguez@example.com',
        password: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHk',
        phone: '5556789012',
        age: 40,
        dpi_number: '9991234561231',
        photo_path: 'https://example.com/photography/test_men.jpg',
        signature_path: 'https://example.com/signature/test.png',
        gender: 'Masculino',
        marital_status: 'Casado',
        hashedSecondPassword: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHk',
    },
    testAdmin: {
        id: 99999,
        name: 'Test María García',
        role: 'Administrador de Sistemas',
        username: 'testmariagarcia',
        email: 'test.maria.garcia@example.com',
        password: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHk',
        phone: '5553456789',
        age: 35,
        dpi_number: '9990987610981',
        photo_path: 'https://example.com/photography/test_woman.jpg',
        signature_path: 'https://example.com/signature/test.png',
        gender: 'Femenino',
        marital_status: 'Divorciado',
        hashedSecondPassword: '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHkDbdUiHkDbdUiHkDbdUiHkDbdUiHk',
    },
};

export const accounts = {
    testAccount: {
        id: 99999,
        account_number: 'test-9999999999',
        balance: 10000,
        account_type: 'Ahorro',
        currency: 'Quetzales',
        user: {
            id: 1,
            name: 'Carlos Pérez',
            signature_path: 'https://example.com/signature.jpg',
        },
    }
};

// Endpoints
export const endpoints = {
    accounts: '/api/accounts',
};
