import { DataTypes } from "sequelize";
import sequelize from "../../config/database-connection.js";

/**
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const CurrencyExchangeModel = sequelize.define("currency_exchange", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    cui: {
        type: DataTypes.CHAR(13),
        allowNull: false,
        unique: true,
    },
    last_exchange_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    daily_limit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 10000.00,
    },
    monthly_limit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    amount_exchanged: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
}, {
    tableName: "currency_exchange",
    timestamps: false,
});

export default CurrencyExchangeModel;
