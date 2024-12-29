import request from 'supertest';
import app from '../../../app';
import AccountModel from '../../../app/models/account-model';
import CardModel from '../../../app/models/card-model';
import sequelize from '../../../config/database-connection';
import { endpoints, accounts } from '../config/test-config';

beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
});

beforeEach(async () => {
    await AccountModel.create(accounts.testAccount1);
});

afterEach(async () => {
    await CardModel.destroy({ where: { account_id: accounts.testAccount1.id } });
    await AccountModel.destroy({ where: { id: accounts.testAccount1.id } });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Integration Test: Create Debit Card Endpoint', () => {
    it('should create a debit card successfully for the test account', async () => {
        const response = await request(app)
            .post(endpoints.create_card)
            .send({
                account_number: accounts.testAccount1.account_number,
                card_type: 'Débito',
                issue_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Tarjeta creada exitosamente.');

        const card = await CardModel.findOne({ where: { account_id: accounts.testAccount1.id } });
        expect(card).not.toBeNull();
        expect(card.card_type).toBe('Débito');
        expect(card.balance).toBe(accounts.testAccount1.balance.toString()+".00");
    });

    it('should return 400 if required data is missing', async () => {
        const response = await request(app)
            .post(endpoints.create_card)
            .send({
                account_number: accounts.testAccount1.account_number,
                card_type: 'Débito',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Faltan datos obligatorios.');
    });

    it('should return 404 if the account is not found', async () => {
        const response = await request(app)
            .post(endpoints.create_card)
            .send({
                account_number: 'nonexistent-account',
                card_type: 'Débito',
                issue_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Cuenta no encontrada.');
    });

    it('should return 400 if the card type is invalid', async () => {
        const response = await request(app)
            .post(endpoints.create_card)
            .send({
                account_number: accounts.testAccount1.account_number,
                card_type: 'Prepagada',
                issue_date: Math.floor(Date.now() / 1000),
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Tipo de tarjeta inválido.');
    });
});
