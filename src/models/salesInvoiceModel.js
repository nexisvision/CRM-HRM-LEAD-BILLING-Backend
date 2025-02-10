import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from '../middlewares/generatorId.js';


const SalesInvoice = sequelize.define('sales_Invoice', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => generateId(),
    },
    salesInvoiceNumber: {
        type: DataTypes.STRING,
        unique: true,
    },
    related_id: {
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
    category: {
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



SalesInvoice.beforeCreate(async (salesInvoice) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingSalesInvoice = await SalesInvoice.findOne({ where: { id: newId } });
        if (!existingSalesInvoice) {
            isUnique = true;
        }
    }
    salesInvoice.id = newId;

    const lastSalesInvoice = await SalesInvoice.findOne({
        order: [['salesInvoiceNumber', 'DESC']]
    });

    let nextNumber = 1;
    if (lastSalesInvoice && lastSalesInvoice.salesInvoiceNumber) {
        const lastNumber = parseInt(lastSalesInvoice.salesInvoiceNumber.replace('QUO#', ''));
        nextNumber = lastNumber + 1;    
    }

    salesInvoice.salesInvoiceNumber = `QUO#${nextNumber}`;

});

export default SalesInvoice;