import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Indicator = sequelize.define('indicator', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => generateId(),
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    overall_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 5,
            min: 0
        }
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

export default Indicator