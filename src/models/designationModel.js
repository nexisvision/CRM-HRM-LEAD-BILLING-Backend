import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Designation = sequelize.define('Designation', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: () => generateId()
  },
  designation_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
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

Designation.beforeCreate(async (designation) => {
  let isUnique = false;
  let newId;
  while (!isUnique) {
    newId = generateId();
    const existingDesignation = await Designation.findOne({ where: { id: newId } });
    if (!existingDesignation) {
      isUnique = true;
    }
  }
  designation.id = newId;
});

export default Designation;