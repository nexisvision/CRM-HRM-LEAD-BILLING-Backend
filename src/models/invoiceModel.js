import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';


const Invoice = sequelize.define('invoice', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => generateId(),
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        unique: true,
    },
    related_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dueDate: {
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



Invoice.beforeCreate(async (invoice) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingInvoice = await Invoice.findOne({ where: { id: newId } });
        if (!existingInvoice) {
            isUnique = true;
        }
    }
    invoice.id = newId;

    const lastInvoice = await Invoice.findOne({
        order: [['invoiceNumber', 'DESC']]
    });

    let nextNumber = 1;
    if (lastInvoice && lastInvoice.invoiceNumber) {
        // Extract the number from the last invoiceNumber and increment it
        const lastNumber = parseInt(lastInvoice.invoiceNumber.replace('INV#', ''));
        nextNumber = lastNumber + 1;
    }

    invoice.invoiceNumber = `INV#${nextNumber}`;

});

export default Invoice;