import TransactionHistoryModel from '../models/transaction-history-model.js';
import AccountModel from '../models/account-model.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const getAllTransactions = async (account_number) => {
    if (!account_number) {
        throw new Error('Account number is required');
    }

    try {
        const accountModel = await AccountModel.findOne({
            where: { account_number },
            attributes: ['id', 'account_number'],
        });

        if (!accountModel) {
            throw new Error('Account not found');
        }

        const transactions = await TransactionHistoryModel.findAll({
            where: { account_id: accountModel.id },
            order: [['created_at', 'DESC']],
            attributes: ['id', 'transaction_type', 'amount', 'description', 'created_at'],
        });

        if (transactions.length === 0) {
            return [];
        }

        return transactions;
    } catch (error) {
        console.error(error);
        throw new Error(`Error retrieving transactions: ${error.message}`);
    }
};

export {
    getAllTransactions
};
