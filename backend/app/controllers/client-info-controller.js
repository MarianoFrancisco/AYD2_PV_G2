import AccountModel from '../models/account-model.js';
import UserModel from '../models/user-model.js';
import { getAllTransactions } from '../controllers/transaction-history-controller.js';

export const getClientInfo = async (req, res) => {
    try {
        const { account_number, cui } = req.query;

        let account = null;
        let transactions = [];
        let user = null;

        if (account_number) {
            // Buscar por número de cuenta
            account = await AccountModel.findOne({
                where: { account_number },
                include: {
                    model: UserModel,
                    as: 'user',
                    attributes: ['id', 'name', 'cui', 'email', 'phone']
                }
            });

            if (!account) {
                return res.status(404).json({ message: 'Account not found' });
            }

            user = account.user; // Obtener información del usuario desde la cuenta
            transactions = await getAllTransactions(account_number);
        } else if (cui) {
            // Buscar por CUI
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

            // Asumir que tomaremos la primera cuenta asociada para las transacciones
            if (user.accounts.length > 0) {
                account = user.accounts[0];
                transactions = await getAllTransactions(account.account_number);
            }
        } else {
            return res.status(400).json({ message: 'Missing query parameter: account_number or cui' });
        }

        // Respuesta unificada
        return res.status(200).json({
            message: account_number ? 'Account found' : 'User found',
            client: {
                id: user.id,
                name: user.name,
                cui: user.cui,
                email: user.email,
                phone: user.phone,
                account: account
                    ? {
                        id: account.id,
                        account_number: account.account_number,
                        balance: account.balance,
                        created_at: account.created_at,
                        update_balance_at: account.update_balance_at
                    }
                    : null
            },
            transactions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
