import request from 'supertest';
import app from '../../app';
import { endpoints, users, accounts } from './config/test-config';

describe('Acceptance Test: Service Payment by Cashier', () => {
    it('should allow cashier to create a service payment', async () => {
        const loginResponse = await request(app)
            .post(endpoints.check)
            .send({
                identifier: users.cashier.email,
                password: users.cashier.password,
            });

        expect(loginResponse.status).toBe(200);

        const paymentResponse = await request(app)
            .post(endpoints.servicePaymentsByCashier)
            .send({
                serviceName: 'Agua',
                serviceCode: '123456',
                amount: 300.00,
                id: 1
            });

        expect(paymentResponse.status).toBe(201);
        expect(paymentResponse.body.message).toBe('Service payment successfully created by cashier.');
    });
});


describe('Acceptance Test: Service Payment by Account', () => {
    it('should create a service payment successfully for an account', async () => {
        const loginResponse = await request(app)
            .post(endpoints.check)
            .send({
                identifier: users.cashier.email,
                password: users.cashier.password,
            });

        expect(loginResponse.status).toBe(200);

        const paymentResponse = await request(app)
            .post(endpoints.servicePaymentsByAccount)
            .send({
                accountNumber: accounts.account1.account_number,
                dpi: '1234567890123',
                serviceName: 'Internet',
                serviceCode: '654321',
                amount: 1.00,
                id: 1
            });

        expect(paymentResponse.status).toBe(201);
        expect(paymentResponse.body.message).toBe('Service payment successfully created by account owner.');
    });
});
