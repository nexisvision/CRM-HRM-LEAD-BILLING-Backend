import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import generateId from "../middlewares/generatorId.js";

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: generateId()
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Tag;