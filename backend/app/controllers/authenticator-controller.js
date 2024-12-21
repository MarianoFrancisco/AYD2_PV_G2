import UserModel from "../models/user-model.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

const checkTwoFactorAuth = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Username/email and password are required.' });
    }

    try {
        const user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { user_name: identifier },
                    { email: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        res.json({ requiresTwoFactor: !!user.second_password_hash, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ message: 'Database error occurred.' });
        }
        res.status(500).json({ message: 'Error during authentication check: ' + error.message });
    }
};

const validateSecondFactorByPassword = async (req, res) => {
    const { identifier, second_password } = req.body;

    if (!identifier || !second_password) {
        return res.status(400).json({ message: 'Username/email and second password are required.' });
    }

    try {
        const user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { user_name: identifier },
                    { email: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isSecondPasswordMatch = await bcrypt.compare(second_password, user.second_password_hash);

        if (!isSecondPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect second password.' });
        }

        res.json({ message: 'Authentication successful.', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ message: 'Database error occurred.' });
        }
        res.status(500).json({ message: 'Error during second factor validation: ' + error.message });
    }
};

const validateSecondFactorByFile = async (req, res) => {
    const { identifier } = req.body;
    const file = req.file;

    if (!identifier || !file) {
        return res.status(400).json({ message: 'Username/email and authentication file are required.' });
    }

    try {
        const user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { user_name: identifier },
                    { email: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const fileContent = file.buffer.toString("utf-8").trim();

        if (fileContent !== user.second_password_hash) {
            return res.status(403).json({ message: 'Invalid .ayd file content.' });
        }

        res.json({ message: 'Authentication successful.', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ message: 'Database error occurred.' });
        }
        res.status(500).json({ message: 'Error during file-based second factor validation: ' + error.message });
    }
};

export {
    checkTwoFactorAuth,
    validateSecondFactorByPassword,
    validateSecondFactorByFile
};
