import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Note = sequelize.define("note", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        defaultValue: () => generateId(),
        primaryKey: true
    },
    project_id: {
        type: DataTypes.INTEGER,
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
    note_employee: {
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