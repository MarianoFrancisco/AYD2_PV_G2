import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

const SurveyModel = sequelize.define('surveys', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Atención al Cliente', 'Servicios', 'Productos'),
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  responded_at: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  Question1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Answer1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Question2: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Answer2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Question3: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Answer3: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Question4: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Answer4: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Question5: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Answer5: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'surveys',
  timestamps: false,
});

export default SurveyModel;
