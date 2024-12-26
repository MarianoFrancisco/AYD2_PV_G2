import request from 'supertest';
import app from '../../../app';
import LoanModel from '../../../app/models/loan-model';
import AccountModel from '../../../app/models/account-model';
import TransactionHistoryModel from '../../../app/models/transaction-history-model';
import UserModel from '../../../app/models/user-model';
import sequelize from '../../../config/database-connection';
import { endpoints } from '../config/test-config';

// Mock de los modelos
jest.mock('../../../app/models/loan-model', () => ({
    findOne: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../../../app/models/account-model', () => ({
    findOne: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../../../app/models/transaction-history-model', () => ({
    create: jest.fn(),
}));

jest.mock('../../../app/models/user-model', () => ({
    findOne: jest.fn(),
}));

// Mock de la transacción de Sequelize
beforeAll(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        throw error;
    }
});

beforeAll(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        throw error;
    }
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Loan Payment Tests', () => {
    it('should complete a loan payment successfully', async () => {
        const mockAccount = {
            id: 1,
            balance: 5000,
            account_number: '1000000001',
            name: 'Carlos',
            last_name: 'Pérez',
            account_type: 'Ahorro',
            currency: 'Quetzales',
            update: jest.fn().mockResolvedValue(true),
        };

        const mockLoan = {
            id: 1,
            remaining_balance: 3000,
            total_amount: 5000,
            state: 'Parcialmente Pagado',
            loan_type: 'Personal',
            update: jest.fn().mockResolvedValue({
                id: 1,
                remaining_balance: 2000,
            }),
        };

        const mockUser = {
            id: 1,
            signature_path: 'https://example.com/signature.jpg',
        };

        AccountModel.findOne.mockResolvedValue(mockAccount);
        LoanModel.findOne.mockResolvedValue(mockLoan);
        UserModel.findOne.mockResolvedValue(mockUser);
        TransactionHistoryModel.create.mockResolvedValue({});

        const response = await request(app)
            .post(endpoints.loanPayment)
            .send({
                employee_id: 1,
                account_number: '1000000001',
                loan_id: 1,
                amount: 1000,
                payment_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Loan payment completed successfully');
        expect(mockAccount.update).toHaveBeenCalled();
        expect(mockLoan.update).toHaveBeenCalled();
    });

    it('should return 400 if amount is less than or equal to zero', async () => {
        const response = await request(app)
            .post(endpoints.loanPayment)
            .send({
                employee_id: 1,
                account_number: '1000000001',
                loan_id: 1,
                amount: 0, // Monto inválido
                payment_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Loan ID and amount are required, and amount must be positive');
    });

    it('should return 404 if account is not found', async () => {
        AccountModel.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post(endpoints.loanPayment)
            .send({
                employee_id: 1,
                account_number: '999999999',
                loan_id: 1,
                amount: 1000,
                payment_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Account not found');
    });

    it('should return 400 if account balance is insufficient', async () => {
        const mockAccount = {
            id: 1,
            balance: 500, // Balance insuficiente
            update: jest.fn(),
        };

        AccountModel.findOne.mockResolvedValue(mockAccount);

        const response = await request(app)
            .post(endpoints.loanPayment)
            .send({
                employee_id: 1,
                account_number: '1000000001',
                loan_id: 1,
                amount: 1000,
                payment_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Insufficient account balance');
    });

    it('should return 404 if loan is not found', async () => {
        const mockAccount = {
            id: 1,
            balance: 5000,
        };

        AccountModel.findOne.mockResolvedValue(mockAccount);
        LoanModel.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post(endpoints.loanPayment)
            .send({
                employee_id: 1,
                account_number: '1000000001',
                loan_id: 999,
                amount: 1000,
                payment_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Loan not found');
    });

    it('should return 500 if there is an internal server error', async () => {
        AccountModel.findOne.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post(endpoints.loanPayment)
            .send({
                employee_id: 1,
                account_number: '1000000001',
                loan_id: 1,
                amount: 1000,
                payment_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error processing loan payment');
    });
});
