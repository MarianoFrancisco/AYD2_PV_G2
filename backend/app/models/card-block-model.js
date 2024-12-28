import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

const CardBlocks = sequelize.define('CardBlocks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  block_reason: {
    type: DataTypes.ENUM('Robo', 'Pérdida', 'Fraude'),
    allowNull: false,
  },
  blocked_at: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
}, {
  tableName: 'card_blocks',
  timestamps: false,
});

export default CardBlocks;
