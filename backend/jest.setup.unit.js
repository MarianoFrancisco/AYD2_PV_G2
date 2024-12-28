jest.mock('./app/models/loan-model', () => ({
    findOne: jest.fn(),
    update: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('./app/models/withdrawal-model', () => ({
    create: jest.fn(),
}));

jest.mock('./app/models/account-model', () => ({
    findOne: jest.fn(),
    update: jest.fn(),
    hasMany: jest.fn(),
    save: jest.fn(),
}));

jest.mock('./app/models/user-model', () => ({
    findByPk: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('./app/models/transaction-history-model', () => ({
    create: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('./app/models/deposit-model', () => ({
    create: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('./config/database-connection', () => {
    const SequelizeMock = {
        define: jest.fn(() => ({
            sync: jest.fn(),
        })),
        authenticate: jest.fn(),
        close: jest.fn(),
        transaction: jest.fn().mockImplementation(async (cb) => {
            const mockTransaction = {
                commit: jest.fn().mockResolvedValue(),
                rollback: jest.fn().mockResolvedValue(),
            };
            return await cb(mockTransaction);
        }),
    };

    return SequelizeMock;
});
