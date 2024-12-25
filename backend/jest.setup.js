jest.mock('./app/models/loan-model', () => ({
    belongsTo: jest.fn(),
}));

jest.mock('./app/models/account-model', () => ({
    hasMany: jest.fn(),
}));

jest.mock('./app/models/transaction-history-model', () => ({
    belongsTo: jest.fn(),
}));

jest.mock('./app/models/deposit-model', () => ({
    belongsTo: jest.fn(),
}));