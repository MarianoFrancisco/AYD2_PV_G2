import request from 'supertest';
import app from '../../../app';
import AccountModel from '../../../app/models/account-model';
import UserModel from '../../../app/models/user-model';
import WithdrawalModel from '../../../app/models/withdrawal-model';
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

describe('Create Withdrawal Tests', () => {
    it('should create a withdrawal successfully for account1 in Quetzales', async () => {
        const mockAccount = {
            ...accounts.account1,
            save: jest.fn().mockResolvedValue(true),
        };

        const mockTransaction = {
            id: 1,
            description: 'Retiro de 100 Quetzales',
            created_at: 1234567890,
            amount: 100,
        };

        AccountModel.findOne.mockResolvedValue(mockAccount);
        UserModel.findOne.mockResolvedValue(accounts.account1.user);
        WithdrawalModel.create.mockResolvedValue({});
        TransactionHistoryModel.create.mockResolvedValue(mockTransaction);

        const response = await request(app)
            .post(endpoints.withdrawal)
            .send({
                account_number: accounts.account1.account_number,
                amount: 100,
                account_type: accounts.account1.account_type,
                currency: 'Quetzales',
                user_id: accounts.account1.user.id,
            });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'Retiro realizado con éxito',
            voucher: {
                account_number: accounts.account1.account_number,
                name: accounts.account1.user.name,
                signature: accounts.account1.user.signature_path,
            },
            transaction: {
                transaction_type: 'Retiro',
                amount: 100,
                description: 'Retiro de 100 Quetzales',
            },
        });
        expect(mockAccount.save).toHaveBeenCalled();
    });

    it('should return 400 if the amount is less than or equal to zero', async () => {
        const response = await request(app)
            .post(endpoints.withdrawal)
            .send({
                account_number: accounts.account1.account_number,
                amount: -10,
                account_type: accounts.account1.account_type,
                currency: 'Quetzales',
                user_id: accounts.account1.user.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('El monto debe ser mayor a cero');
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post(endpoints.withdrawal)
            .send({
                amount: 100,
                account_type: accounts.account1.account_type,
                currency: 'Quetzales',
                user_id: accounts.account1.user.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Faltan datos obligatorios');
    });
});