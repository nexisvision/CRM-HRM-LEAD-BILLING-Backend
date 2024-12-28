import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId  from "../middlewares/generatorId.js";

const Branch = sequelize.define('branch', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: generateId(),
        primaryKey: true
    },
    branchName: {
        type: DataTypes.STRING,
        allowNull: false
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