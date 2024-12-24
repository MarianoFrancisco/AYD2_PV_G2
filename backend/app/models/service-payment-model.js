import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const ServicePaymentModel = sequelize.define('service_payments', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    service_type: {
        type: DataTypes.ENUM('Agua', 'Luz', 'Teléfono', 'Internet'),
        allowNull: false
    },
    service_code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Math.floor(Date.now() / 1000)
    }
}, {
    tableName: 'service_payments',
    timestamps: false,
    hooks: {
        beforeCreate: async (payment) => {
            if (!payment.created_at) {
                payment.created_at = Math.floor(Date.now() / 1000);
            }
        }
    }
});

export default ServicePaymentModel;
