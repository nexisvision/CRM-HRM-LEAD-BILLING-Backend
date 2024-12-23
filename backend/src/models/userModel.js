import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const User = sequelize.define('User', {
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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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
        unique: true,
        validate: {
            isUnique(value) {
                if (value === null || value === '') return true;
            }
        }
    }
});

User.beforeCreate(async (user) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingUser = await User.findOne({
            where: { id: newId }
        });
        if (!existingUser) {
            isUnique = true;
        }
    }
    user.id = newId;
});

export default User;
