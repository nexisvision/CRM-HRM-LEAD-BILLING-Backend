import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => generateId()
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission_id: {
        type: DataTypes.STRING,
        allowNull: false,
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

RolePermission.beforeCreate(async (rolePermission) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingRolePermission = await RolePermission.findOne({ where: { id: newId } });
        if (!existingRolePermission) {
            isUnique = true;
        }
    }
    rolePermission.id = newId;
});

export default RolePermission; 