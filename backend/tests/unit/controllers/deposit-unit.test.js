import request from 'supertest';
import app from '../../../app';
import AccountModel from '../../../app/models/account-model';
import UserModel from '../../../app/models/user-model';
import DepositModel from '../../../app/models/deposit-model';
import TransactionHistoryModel from '../../../app/models/transaction-history-model';
import sequelize from '../../../config/database-connection';
import { accounts, endpoints } from '../config/test-config';

beforeAll(async () => {
    sequelize.authenticate.mockResolvedValue();
});

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(async () => {
    sequelize.close.mockResolvedValue();
});

describe('Create Deposit Tests', () => {
    it('should create a deposit successfully for account1 in Quetzales', async () => {
        const mockAccount = {
            ...accounts.account1,
            save: jest.fn().mockResolvedValue(true),
        };

        const mockTransaction = {
            id: 1,
            description: 'Depósito de efectivo convertido a Quetzales',
            created_at: 1234567890,
            amount: 100,
        };

        AccountModel.findOne.mockResolvedValue(mockAccount);
        UserModel.findOne.mockResolvedValue(accounts.account1.user);
        DepositModel.create.mockResolvedValue({});
        TransactionHistoryModel.create.mockResolvedValue(mockTransaction);

        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.account1.account_number,
                amount: 100,
                account_type: accounts.account1.account_type,
                currency: 'Quetzales',
                allow_dollar_deposit: true,
                user_id: accounts.account1.user.id,
            });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'Depósito realizado con éxito',
            voucher: {
                account_number: accounts.account1.account_number,
                name: accounts.account1.user.name,
                signature: accounts.account1.user.signature_path,
            },
            transaction: {
                transaction_type: 'Depósito',
                amount: 100,
                description: 'Depósito de efectivo convertido a Quetzales',
            },
        });
        expect(mockAccount.save).toHaveBeenCalled();
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.account1.account_number,
                amount: 100,
                account_type: accounts.account1.account_type,
                currency: 'Quetzales',
                // allow_dollar_deposit is missing
                user_id: accounts.account1.user.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Faltan datos obligatorios');
    });

    it('should return 400 if the amount is less than or equal to zero', async () => {
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.account1.account_number,
                amount: -10,
                account_type: accounts.account1.account_type,
                currency: 'Quetzales',
                allow_dollar_deposit: true,
                user_id: accounts.account1.user.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('El monto debe ser mayor a cero');
    });

    it('should return 404 if account is not found', async () => {
        AccountModel.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: '999999999',
                amount: 100,
                account_type: 'Ahorro',
                currency: 'Quetzales',
                allow_dollar_deposit: true,
                user_id: 999,
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Cuenta no encontrada');
    });

    it('should return 400 if dollar deposits are not allowed', async () => {
        const mockAccount = {
            ...accounts.account1,
            currency: 'Quetzales',
            save: jest.fn().mockResolvedValue(true),
        };

        AccountModel.findOne.mockResolvedValue(mockAccount);

        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.account1.account_number,
                amount: 100,
                account_type: accounts.account1.account_type,
                currency: 'Dólares',
                allow_dollar_deposit: false,
                user_id: accounts.account1.user.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Depósitos en dólares no habilitados para esta cuenta');
    });

    it('should return 500 if there is an internal server error', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Silencia los logs
    
        AccountModel.findOne.mockRejectedValue(new Error('Database error'));
    
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.account1.account_number,
                amount: 100,
                account_type: accounts.account1.account_type,
                currency: 'Quetzales',
                allow_dollar_deposit: true,
                user_id: accounts.account1.user.id,
            });
    
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error interno del servidor');
    
        jest.restoreAllMocks();
    });
});
