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
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employee: {
        type: DataTypes.JSON,
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
    late: {
        type: DataTypes.STRING,
        allowNull: true
    },
    halfDay: {
        type: DataTypes.STRING,
        allowNull: true
    },
    working_from: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
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