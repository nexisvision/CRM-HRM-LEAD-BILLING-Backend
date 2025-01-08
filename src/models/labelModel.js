import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: () => generateId(),
    },
    related_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lableType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Tag.beforeCreate(async (tag) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingTag = await Tag.findOne({
            where: { id: newId }
        });
        if (!existingTag) {
            isUnique = true;
        }
    }
    tag.id = newId;
});
export default Tag;