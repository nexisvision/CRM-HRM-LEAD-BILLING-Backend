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
        allowNull: false
    },
    pipeline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deal_stage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deal_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    closed_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deal_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deal_agent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
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