import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Lead = sequelize.define('Lead', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    leadTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leadStage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    leadValue: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    assigned: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    lead_members: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },
    source: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    files: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'new'
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    client_id: {
        type: DataTypes.STRING,
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

Lead.beforeCreate(async (lead) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingLead = await Lead.findOne({ where: { id: newId } });
        if (!existingLead) {
            isUnique = true;
        }
    }
    lead.id = newId;
});

export default Lead;
