import { DataTypes } from "sequelize";
import sequelize from "../../config/database-connection.js";

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const AccountModel = sequelize.define("accounts", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    account_number: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        unique: true,
    },
    cui: {
        type: DataTypes.CHAR(13),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: false,
    },
    photo_path: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    account_type: {
        type: DataTypes.ENUM('Monetario', 'Ahorro'),
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM('Quetzales', 'Dólares'),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
        validate: {
            min: 0,
        },
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    update_balance_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    security_question: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    security_answer: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
});

export default AccountModel;
