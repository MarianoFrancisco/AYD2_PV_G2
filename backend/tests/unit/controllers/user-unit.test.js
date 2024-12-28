import request from 'supertest';
import app from '../../../app';
import UserModel from '../../../app/models/user-model';
import sequelize from '../../../config/database-connection';
import { users, roles, endpoints } from '../config/test-config';

beforeAll(async () => {
    sequelize.authenticate.mockResolvedValue();
});

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(async () => {
    sequelize.close.mockResolvedValue();
});

describe('Update User Role by Admin Tests', () => {
    const validUser = {
        id: users.validUser.id,
        name: users.validUser.name,
        role: users.validUser.role,
        save: jest.fn().mockResolvedValue(true),
    };

    it('should allow admin to update a user role successfully', async () => {
        UserModel.findByPk.mockResolvedValue(validUser);

        const response = await request(app)
            .patch(endpoints.updateRole)
            .send({ id: users.validUser.id, role: roles.allowed[1] });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'User role updated successfully.',
            user: {
                id: validUser.id,
                name: validUser.name,
                role: roles.allowed[1],
            },
        });
        expect(validUser.role).toBe(roles.allowed[1]);
        expect(validUser.save).toHaveBeenCalled();
    });

    it('should return 400 if id or role is missing', async () => {
        const response = await request(app)
            .patch(endpoints.updateRole)
            .send({ id: users.validUser.id });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User ID and role are required.');
    });

    it('should return 400 if role is not allowed', async () => {
        const response = await request(app)
            .patch(endpoints.updateRole)
            .send({ id: users.validUser.id, role: roles.invalid });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            `Role must be one of the following: ${roles.allowed.join(', ')}.`
        );
    });

    it('should return 404 if user to update is not found', async () => {
        UserModel.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .patch(endpoints.updateRole)
            .send({ id: users.nonExistentUser.id, role: roles.allowed[0] });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found.');
    });

    it('should return 500 if there is an internal server error', async () => {
        UserModel.findByPk.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .patch(endpoints.updateRole)
            .send({ id: users.validUser.id, role: roles.allowed[0] });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error updating user role: Database error');
    });
});
