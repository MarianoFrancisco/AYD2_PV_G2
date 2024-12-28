import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

const EmployeeTerminationsModel = sequelize.define('employee_terminations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  signature_admin: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Activo', 'Pendiente', 'Eliminado'),
    allowNull: false,
    defaultValue: 'Activo',
  },
}, {
  tableName: 'employee_terminations',
  timestamps: false,
});

export default EmployeeTerminationsModel;
