import AccountModel from "../models/account-model.js";
import AccountUpdateModel from '../models/account-update-model.js';
import sequelize from '../../config/database-connection.js';

const getBalance = async (req, res) => {

    const userModel = req.userModel;

    try {
        const accountModel = await AccountModel.findOne({
            where: {
                user_id: userModel.id
            }
        })

        res.status(200).json({
            "Saldo": accountModel.balance,
            "Fecha": accountModel.update_balance_at
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts: ' + error.message });
    }

}

const updateAccountInfo = async (req, res) => {
    const { account_number, security_answer, updates } = req.body;

    if (!account_number || !security_answer || !updates || typeof updates !== 'object') {
        return res.status(400).json({ message: 'Account number, security answer, and updates are required.' });
    }

    const transaction = await sequelize.transaction();

    try {
        const account = await AccountModel.findOne({ where: { account_number } });

        if (!account) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Account not found.' });
        }

        // Validate security answer
        if (account.security_answer !== security_answer) {
            await transaction.rollback();
            return res.status(403).json({ message: 'Invalid security answer.' });
        }

        // Allowed fields for update
        const allowedFields = [
            'phone', 'email', 'name', 'last_name', 'photo_path', 'address'
        ];

        // Prepare update details
        const fieldsToUpdate = {};
        const updateDetails = [];

        // Use req.photoPath if middleware uploaded the image
        if (req.photoPath) {
            updates.photo_path = req.photoPath;
        }

        for (const [field, newValue] of Object.entries(updates)) {
            if (allowedFields.includes(field) && account[field] !== undefined && account[field] !== newValue) {
                updateDetails.push({
                    field_name: field,
                    old_value: account[field],
                    new_value: newValue
                });
                fieldsToUpdate[field] = newValue;
            }
        }

        if (updateDetails.length > 0) {
            // Update account fields
            await account.update(fieldsToUpdate, { transaction });

            // Insert log entry
            const logEntry = {
                account_id: account.id,
                field_name: updateDetails.length === 1 ? updateDetails[0].field_name : 'Multiple fields',
                old_value: updateDetails.length === 1
                    ? updateDetails[0].old_value
                    : JSON.stringify(updateDetails.map(d => ({ field: d.field_name, value: d.old_value }))),
                new_value: updateDetails.length === 1
                    ? updateDetails[0].new_value
                    : JSON.stringify(updateDetails.map(d => ({ field: d.field_name, value: d.new_value }))),
                updated_at: Math.floor(Date.now() / 1000)
            };

            await AccountUpdateModel.create(logEntry, { transaction });
        }

        await transaction.commit();

        res.status(200).json({ message: 'Account information updated successfully.' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error updating account information.', error: error.message });
    }
};

export {
    getBalance,
    updateAccountInfo
}