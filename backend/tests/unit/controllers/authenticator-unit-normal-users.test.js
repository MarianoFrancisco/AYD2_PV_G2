import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../app';
import UserModel from '../../../app/models/user-model';
import sequelize from '../../../config/database-connection';
import { users, endpoints } from '../config/test-config';

beforeAll(async () => {
    sequelize.authenticate.mockResolvedValue();
});

jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(async () => {
    sequelize.close.mockResolvedValue();
});

describe('Authentication for Normal Users (Cajero & Atención al Cliente)', () => {
    const roles = ['cashier', 'customerService'];

    roles.forEach((role) => {
        it(`should authenticate ${role} with correct credentials`, async () => {
            const user = users[role];
            UserModel.findOne.mockResolvedValue({
                email: user.email,
                password: user.hashedPassword,
            });
            bcrypt.compare.mockResolvedValue(true);

            const response = await request(app).post(endpoints.check).send({
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

        it(`should reject ${role} with incorrect password`, async () => {
            const user = users[role];
            UserModel.findOne.mockResolvedValue({
                email: user.email,
                password: user.hashedPassword,
            });
            bcrypt.compare.mockResolvedValue(false);

            const response = await request(app).post(endpoints.check).send({
                identifier: user.email,
                password: 'wrongPassword',
            });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Incorrect password.');
        });
    });
});
