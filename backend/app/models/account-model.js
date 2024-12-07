import { DataTypes } from "sequelize"
import sequelize from "../../config/database-connection.js"


const AccountModel = sequelize.define("accounts", {

    id: {
        type: DataTypes.INTEGER,
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
          min: 0, // Reemplaza la constraint CHECK en Sequelize
        },
      },
      created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

}, {
    tableName: "accounts",
    timestamps: false

})

export default AccountModel