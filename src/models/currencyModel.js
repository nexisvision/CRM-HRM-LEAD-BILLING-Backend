import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';

const Currency = sequelize.define('currency', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => generateId(),
        unique: true,
        primaryKey: true
    },
    currencyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    currencyIcon: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

export default Currency;