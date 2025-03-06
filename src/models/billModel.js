import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Bill = sequelize.define('Bill', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    related_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    billNumber: {
        type: DataTypes.STRING,
        unique: true,
    },
    vendor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    billDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    discription: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updated_total: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    bill_status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    client_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    craeted_by: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Bill.beforeCreate(async (bill) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingBill = await Bill.findOne({ where: { id: newId } });
        if (!existingBill) {
            isUnique = true;
        }
    }
    bill.id = newId;

    const lastBill = await Bill.findOne({
        order: [['billNumber', 'DESC']]
    });

    let nextNumber = 1;
    if (lastBill && lastBill.billNumber) {
        // Extract the number from the last invoiceNumber and increment it
        const lastNumber = parseInt(lastBill.billNumber.replace('BILL#', ''));
        nextNumber = lastNumber + 1;
    }

    bill.billNumber = `BILL#${nextNumber}`;

});

export default Bill;