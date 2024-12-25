import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Announcement = sequelize.define('Announcement', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Announcement.beforeCreate(async (announcement) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingAnnouncement = await Announcement.findOne({ where: { id: newId } });
        if (!existingAnnouncement) {
            isUnique = true;
        }
    }
    announcement.id = newId;
});

export default Announcement;