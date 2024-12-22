import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';
import AccountModel from './account-model.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const AccountUpdateModel = sequelize.define('account_updates', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AccountModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    field_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    old_value: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    new_value: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'account_updates',
    timestamps: false
});

export default AccountUpdateModel;
