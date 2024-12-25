import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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

Notification.beforeCreate(async (notification) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingNotification = await Notification.findOne({ where: { id: newId } });
        if (!existingNotification) {
            isUnique = true;
        }
    }
    notification.id = newId;
});

export default Notification;


