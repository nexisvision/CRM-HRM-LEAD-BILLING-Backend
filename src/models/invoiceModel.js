import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';

function generateInvoiceNumber() {
    return 'INV-' + Math.floor(1000 + Math.random() * 9000).toString();
}

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
        allowNull: false,
        unique: true,
        defaultValue: () => generateInvoiceNumber()
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer: {
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
});

export default Invoice;