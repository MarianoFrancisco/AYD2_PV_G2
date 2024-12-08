import { DataTypes } from 'sequelize';
import AccountModel from './account-model.js';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const TransactionHistoryModel = sequelize.define('transaction_history', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transaction_type: {
        type: DataTypes.ENUM('Depósito', 'Retiro', 'Pago de Servicio', 'Pago de Préstamo'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'transaction_history',
    timestamps: false
});


TransactionHistoryModel.belongsTo(AccountModel, { foreignKey: 'account_id', as: 'account' });
AccountModel.hasMany(TransactionHistoryModel, { foreignKey: 'account_id' });

export default TransactionHistoryModel;
