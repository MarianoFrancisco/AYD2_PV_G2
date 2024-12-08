import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';
import LoanModel from './loan-model.js';
import AccountModel from './account-model.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const LoanPaymentModel = sequelize.define('loan_payments', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    loan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
    }
}, {
    tableName: 'loan_payments',
    timestamps: false,
    hooks: {
        beforeCreate: async (payment) => {
            if (!payment.created_at) {
                payment.created_at = Math.floor(Date.now() / 1000);
            }
        }
    }
});

LoanPaymentModel.belongsTo(LoanModel, { foreignKey: 'loan_id', as: 'loan' });
LoanModel.hasMany(LoanPaymentModel, { foreignKey: 'loan_id' });

LoanPaymentModel.belongsTo(AccountModel, { foreignKey: 'account_id', as: 'account' });
AccountModel.hasMany(LoanPaymentModel, { foreignKey: 'account_id' });

export default LoanPaymentModel;
