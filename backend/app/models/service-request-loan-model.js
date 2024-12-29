import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

const RequestLoanModel = sequelize.define('request_loan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts',
            key: 'id',
        },
        onDelete: 'CASCADE', // Acción en cascada si se elimina el registro relacionado
    },
    loan_type: {
        type: DataTypes.ENUM('Personal', 'Hipotecario', 'Vehicular', 'Educativo'),
        allowNull: false,
    },
    requested_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    term: {
        type: DataTypes.ENUM('Años', 'Meses'),
        allowNull: false,
    },
    loan_term: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    requested_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pendiente', 'Aprobada', 'Rechazada'),
        allowNull: false,
    },
    documentation_path: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'request_loan', // Nombre exacto de la tabla
    timestamps: false,
});

export default RequestLoanModel;

