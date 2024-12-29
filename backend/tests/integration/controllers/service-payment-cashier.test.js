import request from 'supertest';
import app from '../../../app';
import UserModel from '../../../app/models/user-model';
import ServicePaymentModel from '../../../app/models/service-payment-model';
import sequelize from '../../../config/database-connection';
import { users, endpoints } from '../config/test-config';

beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    await UserModel.create(users.testCashier);
});

afterEach(async () => {
    await ServicePaymentModel.destroy({ where: { service_code: 'test-service-code' } });
    await UserModel.destroy({ where: { id: users.testCashier.id } });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Integration Test: Create Service Payment by Cashier', () => {
    it('should create a service payment successfully', async () => {
        const response = await request(app)
            .post(endpoints.service_payment_cashier)
            .send({
                serviceName: 'Agua',
                serviceCode: 'test-service-code',
                amount: 250.00,
                id: users.testCashier.id
            })

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Service payment successfully created by cashier.');

        const payment = await ServicePaymentModel.findOne({ where: { service_code: 'test-service-code' } });
        expect(payment).not.toBeNull();
        expect(payment.service_type).toBe('Agua');
        expect(payment.amount).toBe("250.00");
    });
});
