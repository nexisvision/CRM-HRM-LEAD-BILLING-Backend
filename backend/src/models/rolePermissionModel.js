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
        references: {
            model: 'roles',
            key: 'id'
        },

    },
    permission_id: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
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