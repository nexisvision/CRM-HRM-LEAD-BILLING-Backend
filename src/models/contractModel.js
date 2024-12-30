import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';

export const Contract = sequelize.define("Contract", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
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

Contract.beforeCreate(async (contract) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingContract = await Contract.findOne({ where: { id: newId } });
        if (!existingContract) {
            isUnique = true;
        }
    }
    Contract.id = newId;
});

export default Contract;
