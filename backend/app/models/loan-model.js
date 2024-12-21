/*
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';
import AccountModel from './account-model.js';

const LoanModel = sequelize.define('loans', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    remaining_balance: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    state: {
        type: DataTypes.ENUM('Sin Pagar', 'Parcialmente Pagado', 'Pagado'),
        allowNull: false,
        defaultValue: 'Sin Pagar'
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
    }
}, {
    tableName: 'loans',
    timestamps: false,
    hooks: {
        beforeCreate: async (loan) => {
            if (!loan.created_at) {
                loan.created_at = Math.floor(Date.now() / 1000);
            }
            loan.state = 'Sin Pagar';
        },
        beforeUpdate: async (loan) => {
            if (loan.remaining_balance === 0) {
                loan.state = 'Pagado';
            } else if (loan.remaining_balance > 0 && loan.remaining_balance < loan.total_amount) {
                loan.state = 'Parcialmente Pagado';
            }
        }
    }
});

LoanModel.belongsTo(AccountModel, { foreignKey: 'account_id', as: 'account' });
AccountModel.hasMany(LoanModel, { foreignKey: 'account_id' });

export default LoanModel;
*/
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database-connection.js';
import AccountModel from './account-model.js';

const LoanModel = sequelize.define('loans', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    loan_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    remaining_balance: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    state: {
        type: DataTypes.ENUM('Sin Pagar', 'Parcialmente Pagado', 'Pagado'),
        allowNull: false,
        defaultValue: 'Sin Pagar'
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
    }
}, {
    tableName: 'loans',
    timestamps: false,
    hooks: {
        beforeCreate: async (loan) => {
            if (!loan.created_at) {
                loan.created_at = Math.floor(Date.now() / 1000);
            }
            loan.state = 'Sin Pagar';
        },
        beforeUpdate: async (loan) => {
            // Cambiar el estado basado en el balance restante
            if (loan.remaining_balance === 0) {
                loan.state = 'Pagado';
            } else if (loan.remaining_balance > 0 && loan.remaining_balance < loan.total_amount) {
                loan.state = 'Parcialmente Pagado';
            }
        }
    }
});

// Relación con la tabla `accounts`
LoanModel.belongsTo(AccountModel, { foreignKey: 'account_id', as: 'account' });
AccountModel.hasMany(LoanModel, { foreignKey: 'account_id' });

export default LoanModel;
