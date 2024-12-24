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
    role: {
        type: DataTypes.ENUM(
            'Cajero',
            'Atención al Cliente',
            'Administrador de Sistemas',
            'Supervisor'
        ),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dpi_number: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    complete_paperwork_path: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    photo_path: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: false
    },
    marital_status: {
        type: DataTypes.ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo', 'Otro'),
        allowNull: false
    },
    signature_path: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    second_password_hash: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    second_password_updated_at: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

export default UserModel;
