import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';
import AccountModel from './account-model.js';

const DepositModel = sequelize.define(
    'deposits',
    {
        id: {
            type: DataTypes.INTEGER,
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
            validate: {
                min: 0.01,
            },
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
            allowNull: false
        },
    },
    {
        tableName: 'deposits',
        timestamps: false,
    }
);

DepositModel.belongsTo(AccountModel, { foreignKey: 'account_id', as: 'account' });

export default DepositModel;
