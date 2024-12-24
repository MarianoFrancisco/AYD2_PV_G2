import AccountModel from '../models/account-model.js';
import WithdrawalModel from '../models/withdrawal-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';
import UserModel from '../models/user-model.js';

export const createWithdrawal = async (req, res) => {
    try {
        const { account_number, amount, account_type, currency, user_id } = req.body;

        if (!account_number || !amount || !account_type || !currency) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'El monto debe ser mayor a cero' });
        }

        if (!["Monetaria", "Ahorro"].includes(account_type)) {
            return res.status(400).json({ message: 'Tipo de cuenta inválido' });
        }

        if (!["Quetzales", "Dólares"].includes(currency)) {
            return res.status(400).json({ message: 'Tipo de moneda inválido' });
        }

        const account = await AccountModel.findOne({
            where: { account_number }
        });

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        const exchangeRate = 7.75;
        let finalAmount = amount;
        let description = `Retiro de efectivo en ${currency}`;

        if (account.currency === "Quetzales y Dólares") {
            if (currency === "Dólares") {
                finalAmount = amount * exchangeRate;
                description = `Retiro de ${amount} USD convertido a Quetzales`;
            } else if (currency === "Quetzales") {
                finalAmount = amount;
                description = `Retiro de ${amount} Quetzales`;
            }
        } else if (currency === account.currency) {
            finalAmount = amount;
            description = `Retiro de ${amount} ${currency}`;
        } else {
            return res.status(400).json({ message: `La cuenta no admite retiros en ${currency}` });
        }

        if (parseFloat(account.balance) < parseFloat(finalAmount)) {
            return res.status(400).json({ message: 'Fondos insuficientes en la cuenta' });
        }

        const unixTimestamp = Math.floor(Date.now() / 1000);

        account.balance = parseFloat(account.balance) - parseFloat(finalAmount);
        await account.save();

        const withdrawal = await WithdrawalModel.create({
            account_id: account.id,
            amount,
            account_type,
            currency,
            created_at: unixTimestamp
        });

        const transactionHistory = await TransactionHistoryModel.create({
            account_id: account.id,
            transaction_type: 'Retiro',
            amount,
            description,
            created_at: unixTimestamp
        });

        const user = await UserModel.findOne({
            where: { id: user_id },
            attributes: ['name', 'signature_path']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario asociado a la cuenta no encontrado' });
        }

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
            account_type,
            currency,
            description: transactionHistory.description,
            created_at: transactionHistory.created_at
        };

        res.status(200).json({ message: 'Retiro realizado con éxito', voucher, transaction });

    } catch (error) {
        console.error('Error al procesar el retiro:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
