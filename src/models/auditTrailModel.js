// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';
// import generateId from '../middlewares/generatorId.js';

// const AuditTrail = sequelize.define('AuditTrail', {
//     id: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//         unique: true,
//         defaultValue: () => generateId()
//     },
//     url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     activity: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     params: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     query: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     payload: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     response: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     duration: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// });

// AuditTrail.beforeCreate(async (auditTrail) => {
//     let isUnique = false;
//     let newId;
//     while (!isUnique) {
//         newId = generateId();
//         const existingAuditTrail = await AuditTrail.findOne({ where: { id: newId } });
//         if (!existingAuditTrail) {
//             isUnique = true;
//         }
//     }
//     auditTrail.id = newId;
// });

// export default AuditTrail;






import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { nanoid } from "nanoid";

const AuditTrail = sequelize.define("AuditTrail", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => nanoid()
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    params: {
        type: DataTypes.STRING,
        defaultValue: "{}"
    },
    query: {
        type: DataTypes.STRING,
        defaultValue: "{}"
    },
    payload_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    response_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default AuditTrail;