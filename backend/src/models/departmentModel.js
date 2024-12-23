import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: () => generateId()
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  client_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
});

Department.beforeCreate(async (department) => {
  let isUnique = false;
  let newId;
  while (!isUnique) {
    newId = generateId();
    const existingDepartment = await Department.findOne({ where: { id: newId } });
    if (!existingDepartment) {
      isUnique = true;
    }
  }
  department.id = newId;
});

export default Department;