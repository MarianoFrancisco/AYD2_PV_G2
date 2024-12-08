/* 
import AccountModel from '../models/account-model.js';
import UserModel from '../models/user-model.js';
import { getAllTransactions } from '../controllers/transaction-history-controller.js';

export const getClientInfo = async (req, res) => {
    try {
        const { account_number, cui } = req.query;

        // Si se proporciona un número de cuenta
        if (account_number) {
            const account = await AccountModel.findOne({
                where: { account_number },
                include: {
                    model: UserModel,
                    as: 'user',
                    attributes: ['id', 'name', 'cui', 'email', 'phone'],  // Asegúrate de incluir los campos necesarios
                }
            });

            if (!account) {
                return res.status(404).json({ message: 'Account not found' });
            }
            const transactions = await getAllTransactions(account_number);

            return res.status(200).json({
                message: 'Account found',
                account: account,
                transactions
            });
        }

        // Si se proporciona un CUI
        if (cui) {
            const user = await UserModel.findOne({
                where: { cui },
                include: {
                    model: AccountModel,
                    as: 'accounts',  // Incluye la cuenta asociada al usuario
                    attributes: ['id', 'account_number', 'balance'],
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const transactions = await getAllTransactions(user.accounts.account_number);

            return res.status(200).json({
                message: 'User found',
                user: user,
                transactions
            });
        }

        return res.status(400).json({ message: 'Missing query parameter: account_number or cui' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
*/
import AccountModel from '../models/account-model.js';
import UserModel from '../models/user-model.js';
import { getAllTransactions } from '../controllers/transaction-history-controller.js';

export const getClientInfo = async (req, res) => {
    try {
        const { account_number, cui } = req.query;

        // Si se proporciona un número de cuenta
        if (account_number) {
            const account = await AccountModel.findOne({
                where: { account_number },
                include: {
                    model: UserModel,
                    as: 'user',
                    attributes: ['id', 'name', 'cui', 'email', 'phone'],  // Asegúrate de incluir los campos necesarios
                }
            });

            if (!account) {
                return res.status(404).json({ message: 'Account not found' });
            }
            const transactions = await getAllTransactions(account_number);

            return res.status(200).json({
                message: 'Account found',
                account: account,
                transactions
            });
        }

        // Si se proporciona un CUI
        if (cui) {
            const user = await UserModel.findOne({
                where: { cui },
                include: {
                    model: AccountModel,
                    as: 'accounts',  // Incluye las cuentas asociadas al usuario
                    attributes: ['id', 'account_number', 'balance'],
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Si el usuario tiene cuentas, puedes obtener las transacciones para cada cuenta
            const transactions = [];
            for (const account of user.accounts) {
                const accountTransactions = await getAllTransactions(account.account_number);
                transactions.push(...accountTransactions);
            }

            return res.status(200).json({
                message: 'User found',
                user: user,
                transactions
            });
        }

        return res.status(400).json({ message: 'Missing query parameter: account_number or cui' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
