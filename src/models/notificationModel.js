import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    related_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    users: {
        type: DataTypes.JSON,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notification_type: {
        type: DataTypes.ENUM('normal', 'reminder'),
        allowNull: false,
        defaultValue: 'normal'
    },
    client_id: {
        type: DataTypes.STRING,
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


