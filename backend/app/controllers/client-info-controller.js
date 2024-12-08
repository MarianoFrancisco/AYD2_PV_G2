/* 
import AccountModel from '../models/account-model.js';
import UserModel from '../models/user-model.js';

export const getClientInfo = async (req, res) => {
    const { account_number, cui } = req.query;

    try {
        let account;
        let user;

        // Verificar si el parámetro es account_number
        if (account_number) {
            account = await AccountModel.findOne({
                where: { account_number },
                include: {
                    model: UserModel,
                    as: 'user',
                    attributes: ['id', 'name', 'cui', 'email', 'phone', 'pin', 'signature']
                }
            });

            if (!account) {
                return res.status(404).json({ message: 'Account not found' });
            }

            user = account.user;
        }
        // Verificar si el parámetro es cui
        else if (cui) {
            user = await UserModel.findOne({
                where: { cui },
                include: {
                    model: AccountModel,
                    as: 'accounts',
                    attributes: ['id', 'account_number', 'balance']
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            account = user.accounts;
        } else {
            return res.status(400).json({ message: 'Either account_number or cui is required' });
        }

        return res.status(200).json({
            id: user.id,
            name: user.name,
            rol: user.rol,
            cui: user.cui,
            email: user.email,
            phone: user.phone,
            pin: user.pin,
            signature: user.signature,
            accounts: account.map(acc => ({
                id: acc.id,
                account_number: acc.account_number,
                balance: acc.balance,
                created_at: acc.created_at,
                update_balance_at: acc.update_balance_at
            }))
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
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