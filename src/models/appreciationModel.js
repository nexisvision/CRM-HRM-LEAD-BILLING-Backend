import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Appreciation = sequelize.define('Appreciation', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    award: {
        type: DataTypes.STRING,
        allowNull: false
    },
    givenTo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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
})

Appreciation.beforeCreate(async (appreciation) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingAppreciation = await Appreciation.findOne({ where: { id: newId } });
        if (!existingAppreciation) {
            isUnique = true;
        }
    }
    appreciation.id = newId;
})

export default Appreciation;
