import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';

const Feature = sequelize.define('feature', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => generateId(),
        unique: true,
        primaryKey: true
    },
    featureName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default Feature;