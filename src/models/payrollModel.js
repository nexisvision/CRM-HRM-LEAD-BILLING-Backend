import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Payroll = sequelize.define('Payroll', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cycle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    range: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employee: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
});

export default Payroll;