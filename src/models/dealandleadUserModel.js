import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const DealUser = sequelize.define('DealUser', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    dealId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    leadId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    employee: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default DealUser;
