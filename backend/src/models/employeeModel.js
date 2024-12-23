import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    joiningDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    leaveDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null
    },
    accountholder: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    accountnumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    bankname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    ifsc: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    banklocation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    cv_path: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    photo_path: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'employee',
        allowNull: false
    }
});

Employee.beforeCreate(async (employee) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingEmployee = await Employee.findOne({
            where: { id: newId }
        });
        if (!existingEmployee) {
            isUnique = true;
        }
    }
    employee.id = newId;
});

export default Employee;