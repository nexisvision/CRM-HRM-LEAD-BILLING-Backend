import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => generateId()
    },
    dealId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // leadId: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    projectName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    taskTitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    taskStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    taskPriority: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // projectEmployee: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    projectClient: {
        type: DataTypes.STRING,
        allowNull: true
    },
    taskDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    taskDate: {
        type: DataTypes.DATE,
        allowNull: true
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
export default Task;