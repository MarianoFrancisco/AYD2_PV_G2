import { DataTypes } from "sequelize"
import sequelize from "../../config/database-connection.js"
import UserModel from './user-model.js';


const AccountModel = sequelize.define("accounts", {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    account_number: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        unique: true,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: 0,
        },
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
    },
    update_balance_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000),
    },

}, {
    tableName: "accounts",
    timestamps: false,
    hooks: {
        beforeCreate: async (account) => {
            if (!account.created_at) {
                account.created_at = Math.floor(Date.now() / 1000);
            }
            account.update_balance_at = Math.floor(Date.now() / 1000);
        },
        beforeUpdate: async (account) => {
            if (account.changed('balance')) {
                account.update_balance_at = Math.floor(Date.now() / 1000);
            }
        },
    },
})

AccountModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(AccountModel, { foreignKey: 'user_id' });

export default AccountModel