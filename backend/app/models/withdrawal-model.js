import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const WithdrawalModel = sequelize.define('withdrawals', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    account_type: {
        type: DataTypes.ENUM('Monetaria', 'Ahorro'),
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM('Quetzales', 'Dólares'),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    tableName: 'withdrawals',
    timestamps: false,
});

export default WithdrawalModel;
