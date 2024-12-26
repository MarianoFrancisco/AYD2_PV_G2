import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const ServiceCancellation = sequelize.define('service_cancellations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accounts', // Asegúrate de que este nombre coincide con tu modelo de cuentas
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    service: {
      type: DataTypes.ENUM('Cuenta', 'Tarjeta'),
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pendiente', 'Procesada', 'Rechazada'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'service_cancellations',
    timestamps: false, // Desactiva las marcas de tiempo automáticas (createdAt, updatedAt) si no las usas
  });

export default ServiceCancellation;