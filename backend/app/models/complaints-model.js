import { DataTypes } from "sequelize";
import sequelize from "../../config/database-connection.js";

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const ComplaintsModel = sequelize.define("complaints", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts', // Nombre de la tabla referenciada
            key: 'id',
          },
          onDelete: 'CASCADE', // Acción en cascada al eliminar
    },

    category: {
        type: DataTypes.ENUM('Servicio', 'Producto', 'Atencion al cliente'),
        allowNull: false,
    },

    details: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    
}, {
    tableName: "complaints",
    timestamps: false,
    
});

export default ComplaintsModel;
