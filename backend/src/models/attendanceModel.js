import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    employee_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

Attendance.beforeCreate(async (attendance) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingAttendance = await Attendance.findOne({ where: { id: newId } });
        if (!existingAttendance) {
            isUnique = true;
        }
    }
    attendance.id = newId;
});


export default Attendance;