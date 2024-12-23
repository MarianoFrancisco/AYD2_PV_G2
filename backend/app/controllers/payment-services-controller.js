import ServicePaymentModel from '../models/service-payment-model.js';
import AccountModel from '../models/account-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const createServicePaymentByCashier = async (req, res) => {
    const { serviceName, serviceCode, amount } = req.body;
    const userModel = req.userModel;

    if (!serviceName || !serviceCode || !amount ) {
        return res.status(400).json({ message: 'Service name, service code, and amount are required.' });
    }

    const transaction = await sequelize.transaction();

    try {
        const payment = await ServicePaymentModel.create({
            service_type: serviceName,
            service_code: serviceCode,
            amount: amount,
            created_at: Math.floor(Date.now() / 1000)
        }, { transaction });

        const voucher = {
            account_number: 'N/A',
            name: userModel.name,
            signature: userModel.signature_path
        };

        await transaction.commit();

        res.status(201).json({ message: 'Service payment successfully created by cashier.', payment, voucher });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error creating service payment by cashier: ' + error.message });
    }
};

const createServicePaymentByAccount = async (req, res) => {
    const { accountNumber, dpi, serviceName, serviceCode, amount } = req.body;
    const userModel = req.userModel;

    if (!accountNumber || !dpi || !serviceName || !serviceCode || !amount) {
        return res.status(400).json({ message: 'Account number, DPI, service name, service code, and amount are required.' });
    }

    const transaction = await sequelize.transaction();

    try {
        const account = await AccountModel.findOne({
            where: {
                account_number: accountNumber,
                cui: dpi
            }
        }, { transaction });

        if (!account) {
            await transaction.rollback();
            return res.status(403).json({ message: 'Account not found or ownership mismatch.' });
        }

        if (account.balance < amount) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Insufficient balance in account.' });
        }

        account.balance -= amount;
        await account.save({ transaction });

        const payment = await ServicePaymentModel.create({
            account_id: account.id,
            service_type: serviceName,
            service_code: serviceCode,
            amount: amount,
            created_at: Math.floor(Date.now() / 1000)
        }, { transaction });

        await TransactionHistoryModel.create({
            account_id: account.id,
            transaction_type: 'Pago de Servicio',
            amount,
            description: `Pago de servicio - ${serviceName} (${serviceCode})`,
            created_at: Math.floor(Date.now() / 1000)
        }, { transaction });

        const voucher = {
            account_number: account.account_number,
            name: userModel.name,
            signature: userModel.signature_path
        };

        await transaction.commit();

        res.status(201).json({ message: 'Service payment successfully created by account owner.', payment, voucher });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error creating service payment by account owner: ' + error.message });
    }
};

export { createServicePaymentByCashier, createServicePaymentByAccount };