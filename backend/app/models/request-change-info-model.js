import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const requestChangeInfo = sequelize.define('request_change_info', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
    type: {
      type: DataTypes.ENUM('Informacion', 'Password'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    
  }, {
    tableName: 'request_change_info',
    timestamps: false, // Desactiva las marcas de tiempo automáticas (createdAt, updatedAt) si no las usas
  });

export default requestChangeInfo;