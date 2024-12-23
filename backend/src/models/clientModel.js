import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Client = sequelize.define('Client', {
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

Client.beforeCreate(async (client) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingClient = await Client.findOne({
            where: { id: newId }
        });
        if (!existingClient) {
            isUnique = true;
        }
    }
    client.id = newId;
});

export default Client;
