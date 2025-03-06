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


SalesInvoice.beforeCreate(async (salesInvoice) => {
    // Generate unique ID
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

    // Get all invoice numbers and find the highest one
    const allInvoices = await SalesInvoice.findAll({
        attributes: ['salesInvoiceNumber'],
        raw: true
    });

    let highestNumber = 0;
    allInvoices.forEach(invoice => {
        if (invoice.salesInvoiceNumber) {
            const numberPart = parseInt(invoice.salesInvoiceNumber.replace('S-INV#', ''));
            if (!isNaN(numberPart) && numberPart > highestNumber) {
                highestNumber = numberPart;
            }
        }
    });

    // Next number should be highest + 1
    const nextNumber = highestNumber + 1;
    salesInvoice.salesInvoiceNumber = `S-INV#${nextNumber}`;
});

export default SalesInvoice;