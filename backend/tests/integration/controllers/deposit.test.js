import request from 'supertest';
import app from '../../../app';
import AccountModel from '../../../app/models/account-model';
import UserModel from '../../../app/models/user-model';
import TransactionHistoryModel from '../../../app/models/transaction-history-model';
import DepositModel from '../../../app/models/deposit-model';
import sequelize from '../../../config/database-connection';
import { users, accounts, endpoints } from '../config/test-config';

beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
});

beforeEach(async () => {
    await UserModel.create(users.testCashier);
    await AccountModel.create(accounts.testAccount1);
});

afterEach(async () => {
    await TransactionHistoryModel.destroy({ where: { account_id: accounts.testAccount1.id } });
    await DepositModel.destroy({ where: { account_id: accounts.testAccount1.id } });
    await AccountModel.destroy({ where: { id: accounts.testAccount1.id } });
    await UserModel.destroy({ where: { id: users.testCashier.id } });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Integration Test: Deposit Endpoint', () => {
    it('should create a deposit successfully for the test account', async () => {
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.testAccount1.account_number,
                amount: 500,
                account_type: accounts.testAccount1.account_type,
                currency: accounts.testAccount1.currency,
                allow_dollar_deposit: true,
                user_id: users.testCashier.id,
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Depósito realizado con éxito');

        const account = await AccountModel.findOne({ where: { account_number: accounts.testAccount1.account_number } });
        expect(account.balance).toBe("10500.00"); // Saldo inicial 10000 + depósito 500

        const transaction = await TransactionHistoryModel.findOne({ where: { account_id: accounts.testAccount1.id } });
        expect(transaction).not.toBeNull();
        expect(transaction.transaction_type).toBe('Depósito');
        expect(transaction.amount).toBe("500.00");
    });

    it('should return 400 if the amount is less than or equal to zero', async () => {
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.testAccount1.account_number,
                amount: -10,
                account_type: accounts.testAccount1.account_type,
                currency: accounts.testAccount1.currency,
                allow_dollar_deposit: true,
                user_id: users.testCashier.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('El monto debe ser mayor a cero');
    });

    it('should return 404 if the account is not found', async () => {
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: 'nonexistent-account',
                amount: 500,
                account_type: 'Ahorro',
                currency: 'Quetzales',
                allow_dollar_deposit: true,
                user_id: users.testCashier.id,
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Cuenta no encontrada');
    });

    it('should return 400 if deposits in dollars are not allowed', async () => {
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.testAccount1.account_number,
                amount: 500,
                account_type: accounts.testAccount1.account_type,
                currency: 'Dólares',
                allow_dollar_deposit: false,
                user_id: users.testCashier.id,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Depósitos en dólares no habilitados para esta cuenta');
    });

    it('should convert the deposit amount if the currency does not match the account currency', async () => {
        const response = await request(app)
            .post(endpoints.deposit)
            .send({
                account_number: accounts.testAccount1.account_number,
                amount: 100,
                account_type: accounts.testAccount1.account_type,
                currency: 'Dólares',
                allow_dollar_deposit: true,
                user_id: users.testCashier.id,
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Depósito realizado con éxito');

        const account = await AccountModel.findOne({ where: { account_number: accounts.testAccount1.account_number } });
        expect(account.balance).toBe("10775.00"); // 100 * 7.75 + saldo inicial 10000
    });
});
