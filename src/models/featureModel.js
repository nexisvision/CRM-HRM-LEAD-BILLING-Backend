import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';

const Feature = sequelize.define('feature', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => generateId(),
    },
    featureName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default Feature;