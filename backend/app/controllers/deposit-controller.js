/*
import AccountModel from '../models/account-model.js';
import DepositModel from '../models/deposit-model.js';
import UserModel from '../models/user-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';

export const createDeposit = async (req, res) => {
    try {
        const { account_number, amount, deposit_type, target_account } = req.body;

        if (!account_number || !amount || !deposit_type) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'El monto debe ser mayor a cero' });
        }

        const unixTimestamp = Math.floor(Date.now() / 1000); // Marca de tiempo en segundos
        let transaction = {};
        let voucher = {};

        if (deposit_type === 1) {
            // Depósito en efectivo
            const account = await AccountModel.findOne({
                where: { account_number },
            });

            if (!account) {
                return res.status(404).json({ message: 'Cuenta no encontrada' });
            }

            // Obtener datos del usuario
            const user = await UserModel.findOne({
                where: { id: account.user_id },
                attributes: ['name', 'signature'],
            });

            // Actualizar balance
            account.balance = parseFloat(account.balance) + parseFloat(amount);
            await account.save();

            // Registrar depósito en la tabla `deposits`
            await DepositModel.create({
                account_id: account.id,
                amount,
                deposit_type: 'Efectivo',
                created_at: unixTimestamp,
            });

            // Registrar transacción en la tabla `transaction_history`
            const transactionHistory = await TransactionHistoryModel.create({
                account_id: account.id,
                transaction_type: 'Depósito',
                amount,
                description: 'Depósito por efectivo aumento de saldo',
                created_at: unixTimestamp,
            });

            // Preparar datos del voucher
            voucher = {
                account_number,
                name: user.name,
                signature: user.signature,
            };

            transaction = {
                id: transactionHistory.id,
                account_number,
                transaction_type: 'Depósito',
                amount: transactionHistory.amount,
                description: transactionHistory.description,
                created_at: transactionHistory.created_at,
            };
        } else if (deposit_type === 2) {
            // Transferencia bancaria
            if (!target_account) {
                return res.status(400).json({ message: 'La cuenta de destino es obligatoria para una transferencia bancaria' });
            }

            const sourceAccount = await AccountModel.findOne({ where: { account_number } });
            const targetAccount = await AccountModel.findOne({ where: { account_number: target_account } });

            if (!sourceAccount || !targetAccount) {
                return res.status(404).json({ message: 'Una o ambas cuentas no existen' });
            }

            if (parseFloat(sourceAccount.balance) < parseFloat(amount)) {
                return res.status(400).json({ message: 'Fondos insuficientes en la cuenta de origen' });
            }

            // Actualizar balances
            sourceAccount.balance = parseFloat(sourceAccount.balance) - parseFloat(amount);
            targetAccount.balance = parseFloat(targetAccount.balance) + parseFloat(amount);

            await sourceAccount.save();
            await targetAccount.save();

            // Registrar depósitos en la tabla `deposits`
            await DepositModel.create({
                account_id: sourceAccount.id,
                amount,
                deposit_type: 'Transferencia Bancaria',
                created_at: unixTimestamp,
            });

            await DepositModel.create({
                account_id: targetAccount.id,
                amount,
                deposit_type: 'Transferencia Bancaria',
                created_at: unixTimestamp,
            });

            // Registrar transacciones en la tabla `transaction_history`
            await TransactionHistoryModel.create({
                account_id: sourceAccount.id,
                transaction_type: 'Depósito',
                amount,
                description: 'Depósito por transferencia disminución de saldo',
                created_at: unixTimestamp,
            });

            const creditedTransaction = await TransactionHistoryModel.create({
                account_id: targetAccount.id,
                transaction_type: 'Depósito',
                amount,
                description: 'Depósito por transferencia aumento de saldo',
                created_at: unixTimestamp,
            });

            // Obtener datos del usuario para la cuenta acreditada
            const user = await UserModel.findOne({
                where: { id: targetAccount.user_id },
                attributes: ['name', 'signature'],
            });

            // Preparar datos del voucher
            voucher = {
                account_number: target_account,
                name: user.name,
                signature: user.signature,
            };

            transaction = {
                id: creditedTransaction.id,
                account_number: target_account,
                transaction_type: 'Depósito',
                amount: creditedTransaction.amount,
                description: creditedTransaction.description,
                created_at: creditedTransaction.created_at,
            };
        } else {
            return res.status(400).json({ message: 'Tipo de depósito inválido' });
        }

        // Respuesta con el voucher y la última transacción
        res.status(200).json({ message: 'OK', voucher, transaction });
    } catch (error) {
        console.error('Error al procesar el depósito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
*/
import AccountModel from '../models/account-model.js';
import DepositModel from '../models/deposit-model.js';
import UserModel from '../models/user-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';

export const createDeposit = async (req, res) => {
    try {
        const { account_number, amount, deposit_type, target_account } = req.body;

        if (!account_number || !amount || !deposit_type) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'El monto debe ser mayor a cero' });
        }

        const unixTimestamp = Math.floor(Date.now() / 1000); // Marca de tiempo en segundos
        let transaction = {};
        let voucher = {};

        if (deposit_type === 1) {
            // Depósito en efectivo
            const account = await AccountModel.findOne({
                where: { account_number },
            });

            if (!account) {
                return res.status(404).json({ message: 'Cuenta no encontrada' });
            }

            // Obtener datos del usuario
            const user = await UserModel.findOne({
                where: { id: account.user_id },
                attributes: ['name', 'signature'],
            });

            // Actualizar balance
            account.balance = parseFloat(account.balance) + parseFloat(amount);
            await account.save();

            // Registrar depósito en la tabla `deposits`
            await DepositModel.create({
                account_id: account.id,
                amount,
                deposit_type: 'Efectivo',
                created_at: unixTimestamp, // Usar marca de tiempo correcta
            });

            // Registrar transacción en la tabla `transaction_history`
            const transactionHistory = await TransactionHistoryModel.create({
                account_id: account.id,
                transaction_type: 'Depósito',
                amount,
                description: 'Depósito por efectivo aumento de saldo',
                created_at: unixTimestamp,
            });

            // Preparar datos del voucher
            voucher = {
                account_number,
                name: user.name,
                signature: user.signature,
            };

            transaction = {
                id: transactionHistory.id,
                account_number,
                transaction_type: 'Depósito',
                amount: transactionHistory.amount,
                description: transactionHistory.description,
                created_at: transactionHistory.created_at,
            };
        } else if (deposit_type === 2) {
            // Transferencia bancaria
            if (!target_account) {
                return res.status(400).json({ message: 'La cuenta de destino es obligatoria para una transferencia bancaria' });
            }

            const sourceAccount = await AccountModel.findOne({ where: { account_number } });
            const targetAccount = await AccountModel.findOne({ where: { account_number: target_account } });

            if (!sourceAccount || !targetAccount) {
                return res.status(404).json({ message: 'Una o ambas cuentas no existen' });
            }

            if (parseFloat(sourceAccount.balance) < parseFloat(amount)) {
                return res.status(400).json({ message: 'Fondos insuficientes en la cuenta de origen' });
            }

            // Actualizar balances
            sourceAccount.balance = parseFloat(sourceAccount.balance) - parseFloat(amount);
            targetAccount.balance = parseFloat(targetAccount.balance) + parseFloat(amount);

            await sourceAccount.save();
            await targetAccount.save();

            // Registrar depósitos en la tabla `deposits`
            await DepositModel.create({
                account_id: sourceAccount.id,
                amount,
                deposit_type: 'Transferencia Bancaria',
                created_at: unixTimestamp, // Usar marca de tiempo correcta
            });

            await DepositModel.create({
                account_id: targetAccount.id,
                amount,
                deposit_type: 'Transferencia Bancaria',
                created_at: unixTimestamp, // Usar marca de tiempo correcta
            });

            // Registrar transacciones en la tabla `transaction_history`
            await TransactionHistoryModel.create({
                account_id: sourceAccount.id,
                transaction_type: 'Depósito',
                amount,
                description: 'Depósito por transferencia disminución de saldo',
                created_at: unixTimestamp,
            });

            const creditedTransaction = await TransactionHistoryModel.create({
                account_id: targetAccount.id,
                transaction_type: 'Depósito',
                amount,
                description: 'Depósito por transferencia aumento de saldo',
                created_at: unixTimestamp,
            });

            // Obtener datos del usuario para la cuenta acreditada
            const user = await UserModel.findOne({
                where: { id: targetAccount.user_id },
                attributes: ['name', 'signature'],
            });

            // Preparar datos del voucher
            voucher = {
                account_number: target_account,
                name: user.name,
                signature: user.signature,
            };

            transaction = {
                id: creditedTransaction.id,
                account_number: target_account,
                transaction_type: 'Depósito',
                amount: creditedTransaction.amount,
                description: creditedTransaction.description,
                created_at: creditedTransaction.created_at,
            };
        } else {
            return res.status(400).json({ message: 'Tipo de depósito inválido' });
        }

        // Respuesta con el voucher y la última transacción
        res.status(200).json({ message: 'OK', voucher, transaction });
    } catch (error) {
        console.error('Error al procesar el depósito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
