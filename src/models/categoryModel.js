import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";

const Category = sequelize.define('category', {
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

Category.beforeCreate(async (category) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingCategory = await Category.findOne({
            where: { id: newId }
        });
        if (!existingCategory) {
            isUnique = true;
        }
    }
    category.id = newId;
});
export default Category;