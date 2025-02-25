import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Deal = sequelize.define("Deal", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    leadTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dealName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pipeline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    closedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
   
    project: {
        type: DataTypes.STRING,
        allowNull: true
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


Deal.beforeCreate(async (deal) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingDeal = await Deal.findOne({ where: { id: newId } });
        if (!existingDeal) {
            isUnique = true;
        }
    }
    deal.id = newId;
});

export default Deal;