import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const AuditTrail = sequelize.define('AuditTrail', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    params: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    query: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payload: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    response: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

AuditTrail.beforeCreate(async (auditTrail) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingAuditTrail = await AuditTrail.findOne({ where: { id: newId } });
        if (!existingAuditTrail) {
            isUnique = true;
        }
    }
    auditTrail.id = newId;
});

export default AuditTrail;