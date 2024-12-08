/*
import AccountModel from '../models/account-model.js';
import DepositModel from '../models/deposit-model.js';
import UserModel from '../models/user-model.js';


export const createDeposit = async (req, res) => {
    try {
        const { account_number, amount, deposit_type } = req.body;

        // Verificar que todos los datos estén presentes
        if (!account_number || !amount || !deposit_type) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        // Buscar la cuenta por número e incluir la relación con el usuario
        const account = await AccountModel.findOne({
            where: { account_number },
            include: {
                model: UserModel,
                as: 'user', // Alias definido en el modelo
                attributes: ['name', 'signature'], // Solo los campos necesarios
            },
        });

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        // Crear el depósito
        const deposit = await DepositModel.create({
            account_id: account.id,
            amount,
            deposit_type,
        });

        // Generar el voucher
        const voucher = {
            account_number: account.account_number,
            name: account.user.name,
            signature: account.user.signature,
        };

        res.status(201).json({ message: 'Depósito exitoso', voucher });
    } catch (error) {
        console.error('Error al registrar el depósito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
*/
import AccountModel from '../models/account-model.js';
import DepositModel from '../models/deposit-model.js';
import UserModel from '../models/user-model.js';

export const createDeposit = async (req, res) => {
    try {
        const { account_number, amount, deposit_type } = req.body;

        // Verificar que todos los datos estén presentes
        if (!account_number || !amount || !deposit_type) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        // Buscar la cuenta por número e incluir la relación con el usuario
        const account = await AccountModel.findOne({
            where: { account_number },
            include: {
                model: UserModel,
                as: 'user', // Alias definido en el modelo
                attributes: ['name', 'signature'], // Solo los campos necesarios
            },
        });

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        // Verificar si el depósito excede el balance
        if (amount > account.balance) {
            return res.status(400).json({ message: 'El monto excede el balance disponible' });
        }

        // Actualizar el balance de la cuenta
        account.balance -= amount;
        await account.save();

        // Crear el depósito
        const deposit = await DepositModel.create({
            account_id: account.id,
            amount,
            deposit_type,
        });

        // Generar el voucher
        const voucher = {
            account_number: account.account_number,
            name: account.user.name,
            signature: account.user.signature,
        };

        res.status(201).json({ message: 'Depósito exitoso', voucher });
    } catch (error) {
        console.error('Error al registrar el depósito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
