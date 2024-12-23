import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';


const Meeting = sequelize.define('Meeting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
        defaultValue: 'scheduled'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Meeting.beforeCreate(async (meeting) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingMeeting = await Meeting.findOne({
            where: { id: newId }
        });
        if (!existingMeeting) {
            isUnique = true;
        }
    }
    meeting.id = newId;
});

export default Meeting;




