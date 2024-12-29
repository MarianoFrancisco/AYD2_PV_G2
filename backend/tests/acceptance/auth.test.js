import request from 'supertest';
import app from '../../app';
import { endpoints, users } from './config/test-config';

describe('Acceptance Test: Authentication for Normal Users', () => {
    const roles = ['cashier', 'customerService'];

    roles.forEach((role) => {
        it(`should authenticate ${role} successfully`, async () => {
            const user = users[role];
            const response = await request(app)
                .post(endpoints.check)
                .send({
                    identifier: user.email,
                    password: user.password,
                });

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                requiresTwoFactor: false,
                user: {
                    email: user.email,
                },
            });
        });
    });
});

describe('Acceptance Test: Supervisor Authentication with File-Based 2FA', () => {
    it('should authenticate Supervisor with valid file', async () => {
        const user = users.supervisor;
        const response = await request(app)
            .post(endpoints.validateFile)
            .attach('file', Buffer.from(user.secondFactorFile), 'supervisor.ayd')
            .field('identifier', user.email);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'Authentication successful.',
            user: {
                email: user.email,
            },
        });
    });
});

describe('Acceptance Test: Admin Authentication with Password-Based 2FA', () => {
    it('should authenticate Admin with valid second password', async () => {
        const response = await request(app)
            .post(endpoints.validatePassword)
            .send({
                identifier: users.admin.email,
                second_password: users.admin.secondPassword,
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Authentication successful.');
    });
});
