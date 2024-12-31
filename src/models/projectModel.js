import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

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
    category: {
        type: DataTypes.STRING,
        allowNull: false
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
        allowNull: true
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estimatedmonths: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estimatedhours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    project_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'on_hold'),
        allowNull: false,
        defaultValue: 'pending'
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