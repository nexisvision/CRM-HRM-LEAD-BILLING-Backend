import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';

const TaskCalendar = sequelize.define('taskcalendar', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => generateId(),
        unique: true,
        primaryKey: true
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
  
    taskDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    taskTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
   
});

export default TaskCalendar;