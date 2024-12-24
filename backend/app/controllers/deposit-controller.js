import AccountModel from '../models/account-model.js';
import DepositModel from '../models/deposit-model.js';
import UserModel from '../models/user-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';

export const createDeposit = async (req, res) => {
    try {
        const { account_number, amount, account_type, currency, allow_dollar_deposit, user_id } = req.body;

        if (!account_number || !amount || !account_type || !currency || allow_dollar_deposit === undefined) {
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
            where: { account_number },
        });

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        if (currency === "Dólares" && !allow_dollar_deposit) {
            return res.status(400).json({ message: 'Depósitos en dólares no habilitados para esta cuenta' });
        }

        const unixTimestamp = Math.floor(Date.now() / 1000);

        const exchangeRate = 7.75;
        let finalAmount = amount;

        if (currency !== account.currency) {
            if (currency === "Dólares" && account.currency === "Quetzales") {
                finalAmount = amount * exchangeRate;
            } else if (currency === "Quetzales" && account.currency === "Dólares") {
                finalAmount = amount / exchangeRate;
            }
        }

        account.balance = parseFloat(account.balance) + parseFloat(finalAmount);
        await account.save();

        await DepositModel.create({
            account_id: account.id,
            amount,
            account_type,
            currency,
            created_at: unixTimestamp,
        });

        const transactionHistory = await TransactionHistoryModel.create({
            account_id: account.id,
            transaction_type: 'Depósito',
            amount,
            description: `Depósito de efectivo convertido a ${account.currency}`,
            created_at: unixTimestamp,
        });

        const user = await UserModel.findOne({
            where: { id: user_id },
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
            transaction_type: 'Depósito',
            amount: transactionHistory.amount,
            account_type,
            currency,
            description: transactionHistory.description,
            created_at: transactionHistory.created_at,
        };

        res.status(200).json({ message: 'Depósito realizado con éxito', voucher, transaction });
    } catch (error) {
        console.error('Error al procesar el depósito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
