import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Leave = sequelize.define('Leave', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    leaveType: {
        type: DataTypes.ENUM('sick', 'casual', 'annual', 'other'),
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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

Leave.beforeCreate(async (leave) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingLeave = await Leave.findOne({ where: { id: newId } });
        if (!existingLeave) {
            isUnique = true;
        }
    }
    leave.id = newId;
});

export default Leave;