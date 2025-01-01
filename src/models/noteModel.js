import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Note = sequelize.define("note", {
    id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        defaultValue: () => generateId(),
    },
    project_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note_employees: {
        type: DataTypes.JSON,
        allowNull: true
    },
    note_description: {
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
    },
});

export default Note;