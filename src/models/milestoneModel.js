import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Milestone = sequelize.define("milestone", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId(),
    },
    project_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    milestone_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    milestone_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    milestone_cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    milestone_summary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    milestone_start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    add_cost_to_project_budget: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    milestone_end_date: {
        type: DataTypes.DATE,
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

export default Milestone;