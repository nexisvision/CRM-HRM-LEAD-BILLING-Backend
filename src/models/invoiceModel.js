import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';

let lastInvoiceNumber = 0;
    


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
    project: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client: {
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
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('paid', 'unpaid', 'partially paid'),
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true
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