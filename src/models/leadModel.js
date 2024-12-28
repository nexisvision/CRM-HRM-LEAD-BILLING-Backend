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
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
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
    leadValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null
    },
    assigned: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.ENUM('new', 'qualified', 'converted', 'proposal sent'),
        allowNull: false,
        defaultValue: 'new'
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    notes: {
        type: DataTypes.STRING,
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
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    lastContacted: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    totalBudget: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    targetDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    contentType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
