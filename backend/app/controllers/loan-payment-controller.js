import LoanModel from '../models/loan-model.js';
import AccountModel from '../models/account-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';
import UserModel from '../models/user-model.js';
import sequelize from '../../config/database-connection.js';
const save = async (req, res) => {
    const { employee_id, account_number, loan_id, amount, payment_date } = req.body;

    if (!loan_id || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Loan ID and amount are required, and amount must be positive' });
    }

    const transaction = await sequelize.transaction();

    try {
        const accountModel = await AccountModel.findOne({
            where: { account_number: account_number },
            attributes: ['id', 'balance', 'account_number', 'name', 'last_name', 'account_type', 'currency', 'update_balance_at'],
            transaction
        });

        if (!accountModel) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (accountModel.balance < amount) {
            return res.status(400).json({ message: 'Insufficient account balance' });
        }

        const loanModel = await LoanModel.findOne({
            where: { id: loan_id },
            attributes: ['id', 'remaining_balance', 'total_amount', 'state', 'loan_type'],
            transaction
        });

        if (!loanModel) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        if (amount > loanModel.remaining_balance) {
            return res.status(400).json({ message: 'Payment exceeds remaining loan balance' });
        }

        const updatedLoan = await loanModel.update(
            { remaining_balance: loanModel.remaining_balance - amount },
            { transaction }
        );

        const newLoanState = updatedLoan.remaining_balance === 0 ? 'Pagado' : 'Parcialmente Pagado';
        await loanModel.update({ state: newLoanState }, { transaction });

        await accountModel.update(
            {
                balance: accountModel.balance - amount,
                update_balance_at: Math.floor(Date.now() / 1000)
            },
            { transaction }
        );

        const description = newLoanState === 'Pagado' ? 'Pago total' : 'Pago parcial';
        await TransactionHistoryModel.create({
            account_id: accountModel.id,
            transaction_type: 'Pago de Préstamo',
            amount,
            description,
            created_at: Math.floor(Date.now() / 1000)
        }, { transaction });

        const userModel = await UserModel.findOne({
            where: { id: employee_id },
            attributes: ['id', 'signature_path'],
            transaction
        });

        if (!userModel) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const voucher = {
            account_number: accountModel.account_number,
            name: `${accountModel.name} ${accountModel.last_name}`,
            signature: userModel.signature_path
        };

        const loanState = {
            loanState: newLoanState
        };

        await transaction.commit();

        res.status(200).json({
            message: 'Loan payment completed successfully',
            payment: {
                created_at: payment_date,
                loan_id: updatedLoan.id,
                account_id: updatedLoan.account_id,
                amount
            },
            loanState,
            voucher
        });
    } catch (error) {
        if (transaction.finished !== 'commit') {
            await transaction.rollback();
        }
        res.status(500).json({ message: 'Error processing loan payment', error: error.message });
    }
};

export {
    save
};
