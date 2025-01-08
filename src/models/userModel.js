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
    profilePic: {
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
        unique: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    joiningDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    leaveDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null
    },
    accountholder: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    accountnumber: {
        type: DataTypes.BIGINT,  // Changed from NUMBER to BIGINT
        allowNull: true,
        defaultValue: null
    },
    bankname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    ifsc: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    banklocation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    cv_path: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    links: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },
    e_signatures: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
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
