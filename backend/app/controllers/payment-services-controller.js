import ServicePaymentModel from '../models/service-payment.js';
import AccountModel from '../models/account-model.js';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const save = async (req, res) => {
    const { service_name, service_code, amount } = req.body;
    const userModel = req.userModel;

    if (userModel.rol !== 'Encargado') {
        return res.status(403).json({ message: 'Forbidden: User must have the "Encargado" role' });
    }

    const transaction = await sequelize.transaction();

    try {
        if (!service_name || !service_code || !amount) {
            return res.status(400).json({ message: 'Service name, service code, and amount are required' });
        }

        const accountModel = await AccountModel.findOne({
            where: { user_id: userModel.id },
            attributes: ['id', 'balance', 'account_number'],
            transaction
        });

        if (!accountModel) {
            return res.status(404).json({ message: 'Account not found for the user' });
        }

        if (accountModel.balance < amount) {
            return res.status(400).json({ message: 'Insufficient account balance' });
        }

        const payment = await ServicePaymentModel.create({
            account_id: accountModel.id,
            user_id: userModel.id,
            service_type: service_name,
            service_code,
            amount,
            created_at: Math.floor(Date.now() / 1000)
        }, { transaction });

        await accountModel.update(
            { balance: accountModel.balance - amount },
            { transaction }
        );

        const voucher = {
            "account_number": accountModel.account_number,
            'name': userModel.name,
            'signature': userModel.signature
        }

        await transaction.commit();

        res.status(201).json({
            message: 'Service payment completed successfully',
            payment,
            voucher
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error processing service payment', error: error.message });
    }
};

export {
    save
};
