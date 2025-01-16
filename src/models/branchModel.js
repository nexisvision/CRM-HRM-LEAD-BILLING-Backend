import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Branch = sequelize.define('branch', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: generateId(),
    },
    branchName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true
    }
});



export default Branch;