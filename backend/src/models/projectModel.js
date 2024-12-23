import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";
import User from "./userModel.js";
import Client from "./clientModel.js";

const Project = sequelize.define("Project", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    startdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    enddate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    projectimage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: true
    },
    budget: {
        type: DataTypes.DECIMAL(10, 2),  // Changed from NUMBER to DECIMAL
        allowNull: false
    },
    estimatedmonths: {  
        type: DataTypes.INTEGER,  // Changed from NUMBER to INTEGER
        allowNull: false
    },
    project_description: {
        type: DataTypes.TEXT,  // Changed to TEXT for longer content
        allowNull: true
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// nsure unique project_id before creating
Project.beforeCreate(async (project) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        // Check if this ID already exists
        const existingProject = await Project.findOne({
            where: { id: newId }
        });
        if (!existingProject) {
            isUnique = true;
        }
    }
    project.id = newId;
});
export default Project;