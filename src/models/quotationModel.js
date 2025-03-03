import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';


const Quotations = sequelize.define('quotations', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => generateId(),
    },
    quotationNumber: {
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
    lead: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null,
    },
    client: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    // calculatedTax: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     defaultValue: null
    // },
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



Quotations.beforeCreate(async (quotation) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingQuotation = await Quotations.findOne({ where: { id: newId } });
        if (!existingQuotation) {
            isUnique = true;
        }
    }
    quotation.id = newId;

    const lastQuotation = await Quotations.findOne({
        order: [['quotationNumber', 'DESC']]
    });

    let nextNumber = 1;
    if (lastQuotation && lastQuotation.quotationNumber) {
        // Extract the number from the last invoiceNumber and increment it
        const lastNumber = parseInt(lastQuotation.quotationNumber.replace('QUO#', ''));
        nextNumber = lastNumber + 1;
    }

    quotation.quotationNumber = `QUO#${nextNumber}`;

});

export default Quotations;