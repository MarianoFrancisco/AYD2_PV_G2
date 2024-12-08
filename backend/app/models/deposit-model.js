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
        deposit_type: {
            type: DataTypes.ENUM('Efectivo', 'Transferencia Bancaria'),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'deposits',
        timestamps: false,
    }
);

// Definir relaciones
DepositModel.belongsTo(AccountModel, { foreignKey: 'account_id', as: 'account' });

export default DepositModel;
