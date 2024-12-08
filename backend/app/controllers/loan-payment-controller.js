import LoanPaymentModel from '../models/loan-payment.js';
import LoanModel from '../models/loan-model.js';
import AccountModel from '../models/account-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const save = async (req, res) => {
    const { loan_number, amount } = req.body;
    const userModel = req.userModel;

    if (!loan_number || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Loan number and amount are required, and amount must be positive' });
    }

    const transaction = await sequelize.transaction();

    try {
        const accountModel = await AccountModel.findOne({
            where: { user_id: userModel.id },
            attributes: ['id', 'balance', 'account_number'],
            transaction
        });

        if (!accountModel) {
            return res.status(404).json({ message: 'Account not found for the user' });
        }

        const loanModel = await LoanModel.findOne({
            where: { id: loan_number },
            attributes: ['id', 'remaining_balance', 'total_amount', 'state'],
            transaction
        });

        if (!loanModel) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        if (loanModel.remaining_balance < amount) {
            return res.status(400).json({ message: 'Payment exceeds remaining balance' });
        }

        if (accountModel.balance < amount) {
            return res.status(400).json({ message: 'Insufficient account balance' });
        }

        const payment = await LoanPaymentModel.create({
            loan_id: loanModel.id,
            account_id: accountModel.id,
            amount,
        }, { transaction });

        const updatedLoan = await loanModel.update(
            { remaining_balance: loanModel.remaining_balance - amount },
            { transaction }
        );

        await accountModel.update(
            { balance: accountModel.balance - amount },
            { transaction }
        );

        await TransactionHistoryModel.create({
            account_id: accountModel.id,
            transaction_type: 'Pago de Préstamo',
            amount,
            description: `Pago de préstamo - ${updatedLoan.state} (${loan_number})`,
            created_at: Math.floor(Date.now() / 1000)
        }, { transaction });

        const voucher = {
            "account_number": accountModel.account_number,
            'name': userModel.name,
            'signature': userModel.signature
        }

        await transaction.commit();

        res.status(201).json({
            message: 'Loan payment completed successfully',
            payment,
            loanState: updatedLoan.state,
            voucher
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error processing loan payment', error: error.message });
    }
};

export {
    save
};
