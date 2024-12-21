import AccountModel from '../models/account-model.js';
import { getAllTransactions } from '../controllers/transaction-history-controller.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */ 
const getAccountByNumber = async (req, res) => {
    try {
        const { account_number } = req.query;

        if (!account_number) {
            return res.status(400).json({ message: 'Missing query parameter: account_number' });
        }

        const account = await AccountModel.findOne({ where: { account_number } });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const transactions = await getAllTransactions(account.account_number);

        return res.status(200).json({
            message: 'Account found',
            client: {
                id: account.id,
                name: account.name,
                cui: account.cui,
                email: account.email,
                phone: account.phone,
                account_number: account.account_number,
                balance: account.balance,
                created_at: account.created_at,
                update_balance_at: account.update_balance_at
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

const getAccountsByCUI = async (req, res) => {
    try {
        const { cui } = req.query;

        if (!cui) {
            return res.status(400).json({ message: 'Missing query parameter: cui' });
        }

        const accounts = await AccountModel.findAll({ where: { cui } });

        if (accounts.length === 0) {
            return res.status(404).json({ message: 'No accounts found for the provided CUI' });
        }

        const accountsWithTransactions = await Promise.all(accounts.map(async account => {
            const transactions = await getAllTransactions(account.account_number);
            return {
                account: {
                    id: account.id,
                    name: account.name,
                    cui: account.cui,
                    email: account.email,
                    phone: account.phone,
                    account_number: account.account_number,
                    balance: account.balance,
                    created_at: account.created_at,
                    update_balance_at: account.update_balance_at
                },
                transactions
            };
        }));

        return res.status(200).json({
            message: 'Accounts found',
            client: accountsWithTransactions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export {
    getAccountByNumber,
    getAccountsByCUI
};
