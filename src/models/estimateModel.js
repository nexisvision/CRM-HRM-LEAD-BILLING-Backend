import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';


const Estimate = sequelize.define('estimate', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => generateId(),
    },
    estimateNumber: {
        type: DataTypes.STRING,
        unique: true,
    },
    related_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valid_till: {
        type: DataTypes.DATE,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client: {
        type: DataTypes.STRING,
        allowNull: false                                                            
    },
    calculatedTax: {
        type: DataTypes.INTEGER,
        allowNull: true,   
        defaultValue: null
    },
    items: {    
        type: DataTypes.JSON,
        allowNull: false
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
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



Estimate.beforeCreate(async (estimate) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingEstimate = await Estimate.findOne({ where: { id: newId } });
        if (!existingEstimate) {
            isUnique = true;
        }
    }
    estimate.id = newId;

    const lastEstimate = await Estimate.findOne({
        order: [['estimateNumber', 'DESC']]
    });

    let nextNumber = 1;
    if (lastEstimate && lastEstimate.estimateNumber) {
        // Extract the number from the last invoiceNumber and increment it
        const lastNumber = parseInt(lastEstimate.estimateNumber.replace('EST#', ''));
        nextNumber = lastNumber + 1;
    }

    estimate.estimateNumber = `EST#${nextNumber}`;

});

export default Estimate;