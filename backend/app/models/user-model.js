import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('Encargado', 'Cliente'),
        allowNull: false
    },
    cui: {
        type: DataTypes.CHAR(13),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: null
    },
    pin: {
        type: DataTypes.CHAR(6),
        allowNull: false
    },
    signature: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false,
    hooks: {
        beforeSave: async (user) => {
            if (user.pin) {
                user.pin = user.pin;
            }
        }
    }
});

export default UserModel;
