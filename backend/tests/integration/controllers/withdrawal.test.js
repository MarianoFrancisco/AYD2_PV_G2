import request from 'supertest';
import app from '../../../app';
import AccountModel from '../../../app/models/account-model';
import UserModel from '../../../app/models/user-model';
import TransactionHistoryModel from '../../../app/models/transaction-history-model';
import WithdrawalModel from '../../../app/models/withdrawal-model';
import sequelize from '../../../config/database-connection';
import { users, accounts, endpoints } from '../config/test-config';

beforeAll(async () => {
    console.log('Initializing database...');
    await sequelize.authenticate();
    await sequelize.sync();
});

beforeEach(async () => {
    console.log('Creating test user and account...');
    await UserModel.create(users.testCashier);
    await AccountModel.create(accounts.testAccount);
});

afterEach(async () => {
    console.log('Cleaning test data...');
    await TransactionHistoryModel.destroy({ where: { account_id: accounts.testAccount.id } });
    await WithdrawalModel.destroy({ where: { account_id: accounts.testAccount.id } });
    await AccountModel.destroy({ where: { id: accounts.testAccount.id } });
    await UserModel.destroy({ where: { id: users.testCashier.id } });
});

afterAll(async () => {
    console.log('Closing database connection...');
    await sequelize.close();
});

describe('Integration Test: Withdrawal Endpoint', () => {
    console.log(TransactionHistoryModel)
    it('should create a withdrawal successfully for the test account', async () => {
        const response = await request(app)
            .post(endpoints.withdrawal)
            .send({
                account_number: accounts.testAccount.account_number,
                amount: 500,
                account_type: accounts.testAccount.account_type,
                currency: accounts.testAccount.currency,
                user_id: accounts.testAccount.user.id,
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Retiro realizado con éxito');

        // Verificar que el saldo de la cuenta se actualizó correctamente
        const account = await AccountModel.findOne({ where: { account_number: accounts.testAccount.account_number } });
        expect(account.balance).toBe(9500); // Saldo inicial 10000 - retiro 500

        // Verificar que se creó una transacción en el historial
        const transaction = await TransactionHistoryModel.findOne({ where: { account_id: accounts.testAccount.id } });
        expect(transaction).not.toBeNull();
        expect(transaction.transaction_type).toBe('Retiro');
        expect(transaction.amount).toBe(500);
    });

    it('should return 400 if the amount is less than or equal to zero', async () => {
        const response = await request(app)
            .post(endpoints.withdrawal)
            .send({
                account_number: accounts.testAccount.account_number,
                amount: -10,
                account_type: accounts.testAccount.account_type,
                currency: accounts.testAccount.currency,
                user_id: accounts.testAccount.user.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('El monto debe ser mayor a cero');
    });

    it('should return 404 if the account is not found', async () => {
        const response = await request(app)
            .post(endpoints.withdrawal)
            .send({
                account_number: 'nonexistent-account',
                amount: 500,
                account_type: 'Ahorro',
                currency: 'Quetzales',
                user_id: accounts.testAccount.user.id,
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Cuenta no encontrada');
    });
});
