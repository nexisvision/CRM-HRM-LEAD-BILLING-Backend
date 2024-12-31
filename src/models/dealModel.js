import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";


const Deal = sequelize.define("Deal", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    dealName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    clients: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sources: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});

export default Deal;