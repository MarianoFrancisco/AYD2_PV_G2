import AccountModel from '../models/account-model.js';
import WithdrawalModel from '../models/withdrawal-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';
import UserModel from '../models/user-model.js';

export const createWithdrawal = async (req, res) => {
    try {
        //numbero de cuenta, monto, tipo de retiro, tipo de cuenta, tipo de moneda
        const { account_number, amount, withdrawal_type, account_type, currency } = req.body;

        //Validar campos obligatorios
        if (!account_number || !amount || !withdrawal_type || !account_type || !currency) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'El monto debe ser mayor a cero' });
        }

        if (![1, 2].includes(withdrawal_type)) {
            return res.status(400).json({ message: 'Tipo de retiro inválido' });
        }

        if (![1, 2].includes(currency)) {
            return res.status(400).json({ message: "Tipo de moneda invalido" })
        }

        const account = await AccountModel.findOne({
            where: {
                account_number: account_number
            }
        });

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        if (parseFloat(account.balance) < parseFloat(amount)) {
            return res.status(400).json({ message: 'Fondos insuficientes en la cuenta' });
        }

        const unixTimestamp = Math.floor(Date.now() / 1000);

        // Actualizar balance
        account.balance = parseFloat(account.balance) - parseFloat(amount);
        await account.save();

        // Registrar retiro
        const withdrawal = await WithdrawalModel.create({
            account_id: account.id,
            amount,
            withdrawal_type: withdrawal_type === 1 ? 'Ventanilla' : 'Cajero Automático',
            created_at: unixTimestamp,
            account_type: account_type === 1 ? "Monetaria" : "Ahorro",
            currency: currency,
        });

        // Registrar en transaction_history
        const transactionHistory = await TransactionHistoryModel.create({
            account_id: account.id,
            transaction_type: 'Retiro',
            amount,
            description: withdrawal_type === 1
                ? 'Retiro efectivo desde ventanilla'
                : 'Retiro efectivo desde cajero automático',
            created_at: unixTimestamp,
        });

        // Obtener datos para el voucher
        const user = await UserModel.findOne({
            where: { id: account.id },
            attributes: ['name', 'signature_path'],
        });

        const voucher = {
            account_number,
            name: user.name,
            signature: user.signature_path,
        };

        const transaction = {
            id: transactionHistory.id,
            account_number,
            transaction_type: 'Retiro',
            amount: transactionHistory.amount,
            account_type: account_type,
            currency: currency,
            description: transactionHistory.description,
            created_at: transactionHistory.created_at,
        };

        res.status(200).json({ message: 'OK', voucher, transaction });
    } catch (error) {
        console.error('Error al procesar el retiro:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
