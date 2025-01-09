import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const EmployeeSalary = sequelize.define('EmployeeSalary', {
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
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    annual_CTC: {
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
})

EmployeeSalary.beforeCreate(async (employeeSalary) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingEmployeeSalary = await EmployeeSalary.findOne({ where: { id: newId } });
        if (!existingEmployeeSalary) {
            isUnique = true;
        }
    }
    employeeSalary.id = newId;
});

export default EmployeeSalary;