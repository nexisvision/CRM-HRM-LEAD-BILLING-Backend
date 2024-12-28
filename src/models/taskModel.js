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
    projectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskPriority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // projectEmployee: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    projectClient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDescription: {
        type: DataTypes.TEXT,
        allowNull: false
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