/*
import LoanPaymentModel from '../models/loan-payment.js';
import LoanModel from '../models/loan-model.js';
import AccountModel from '../models/account-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';
import sequelize from '../../config/database-connection.js';

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
*/
//import LoanPaymentModel from '../models/loan-payment.js';
import LoanModel from '../models/loan-model.js';
import AccountModel from '../models/account-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';
import UserModel from '../models/user-model.js';  // Asumimos que existe un modelo de usuario
import sequelize from '../../config/database-connection.js';

const save = async (req, res) => {
    const { employee_id, account_number, loan_id, amount, payment_date } = req.body;

    // Validaciones iniciales
    if (!loan_id || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Loan ID, amount are required, and amount must be positive' });
    }

    const transaction = await sequelize.transaction();

    try {
        // Obtener la cuenta del cliente con el número de cuenta
        const accountModel = await AccountModel.findOne({
            where: { account_number: account_number },
            attributes: ['id', 'balance', 'account_number', 'name', 'last_name', 'account_type', 'currency', 'update_balance_at'],
            transaction
        });

        if (!accountModel) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Verificar que el saldo sea suficiente
        if (accountModel.balance < amount) {
            return res.status(400).json({ message: 'Insufficient account balance' });
        }

        // Obtener el préstamo
        const loanModel = await LoanModel.findOne({
            where: { id: loan_id },
            attributes: ['id', 'remaining_balance', 'total_amount', 'state', 'loan_type'],
            transaction
        });

        if (!loanModel) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        // Validar que el pago no exceda el saldo pendiente del préstamo
        if (amount > loanModel.remaining_balance) {
            return res.status(400).json({ message: 'Payment exceeds remaining loan balance' });
        }

        // Actualizar el saldo restante del préstamo
        const updatedLoan = await loanModel.update(
            { remaining_balance: loanModel.remaining_balance - amount },
            { transaction }
        );

        // Determinar el estado del préstamo (total o parcial)
        const newLoanState = updatedLoan.remaining_balance === 0 ? 'Pagado' : 'Parcialmente Pagado';
        await loanModel.update({ state: newLoanState }, { transaction });

        // Actualizar el saldo de la cuenta
        await accountModel.update(
            {
                balance: accountModel.balance - amount,
                update_balance_at: Math.floor(Date.now() / 1000)
            },
            { transaction }
        );

        // Insertar el pago en el historial de transacciones
        const description = newLoanState === 'Pagado' ? 'Pago total' : 'Pago parcial';
        await TransactionHistoryModel.create({
            account_id: accountModel.id,
            transaction_type: 'Pago de Préstamo',
            amount,
            description,
            created_at: Math.floor(Date.now() / 1000)
        }, { transaction });

        // Obtener la firma del empleado
        const userModel = await UserModel.findOne({
            where: { id: employee_id },
            attributes: ['id', 'signature_path'],
            transaction
        });

        if (!userModel) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Crear el voucher de respuesta
        const voucher = {
            employeeId: userModel.id,
            employeeSignature: userModel.signature_path,
            account: {
                account_number: accountModel.account_number,
                name: accountModel.name,
                last_name: accountModel.last_name,
                account_type: accountModel.account_type,
                currency: accountModel.currency
            },
            loan: {
                paid_amount: amount,
                state: newLoanState,
                loan_type: loanModel.loan_type,
                total_amount: loanModel.total_amount,
                remaining_balance: updatedLoan.remaining_balance
            }
        };

        // Confirmar la transacción
        await transaction.commit();

        // Responder con éxito
        res.status(200).json({
            message: 'Loan payment completed successfully',
            voucher
        });
    } catch (error) {
        // Revertir transacción en caso de error
        await transaction.rollback();
        res.status(500).json({ message: 'Error processing loan payment', error: error.message });
    }
};

export {
    save
};
