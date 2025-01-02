import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    related_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paidOn: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receipt: {
        type: DataTypes.STRING,

        allowNull: true,
    },
    remark: {
        type: DataTypes.STRING,

        allowNull: true,
    },
    created_by: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,

    }
});

export default Payment;
