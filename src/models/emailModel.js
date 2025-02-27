import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Email = sequelize.define('Email', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => generateId()
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    html: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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

Email.beforeCreate(async (email) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingEmail = await Email.findOne({ where: { id: newId } });
        if (!existingEmail) {
            isUnique = true;
        }
    }
    email.id = newId;
});



export default Email;



