import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js'; // Ajusta esta ruta si tu conexión está en otra ubicación

const CardModel = sequelize.define('Card', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts', // Debe coincidir con el nombre del modelo de la tabla `accounts`
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    card_number: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
    },
    card_type: {
        type: DataTypes.ENUM('Crédito', 'Débito'),
        allowNull: false,
    },
    issue_date: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    expiry_date: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    credit_limit: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: null,
    },
    balance: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'cards', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Evitar que Sequelize cree columnas `createdAt` y `updatedAt`
});

export default CardModel;
