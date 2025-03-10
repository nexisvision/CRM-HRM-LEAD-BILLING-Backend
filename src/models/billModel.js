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
    subtotal:{
        type: DataTypes.INTEGER,
        allowNull: false
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
    // Generate unique ID
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

    // Get all bill numbers and find the highest one
    const allBills = await Bill.findAll({
        attributes: ['billNumber'],
        raw: true
    });

    // console.log("All existing bill numbers:", allBills);

    let highestNumber = 0;
    allBills.forEach(bill => {
        if (bill.billNumber) {
            const numberPart = parseInt(bill.billNumber.replace('BILL#', ''));
            if (!isNaN(numberPart) && numberPart > highestNumber) {
                highestNumber = numberPart;
            }
        }
    });

    // console.log("Highest bill number found:", highestNumber);

    // Next number should be highest + 1
    const nextNumber = highestNumber + 1;
    bill.billNumber = `BILL#${nextNumber}`;

    // console.log("New bill number assigned:", bill.billNumber);
});

export default Bill;