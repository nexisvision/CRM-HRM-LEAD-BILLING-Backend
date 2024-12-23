import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    name: {
        type: DataTypes.ENUM('platinum', 'gold', 'silver', 'bronze'),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    billing_cycle: {
        type: DataTypes.ENUM('lifetime', 'yearly'),
        allowNull: false
    },
    trial_days: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    max_users: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_customers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_vendors: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_clients: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    storage_limit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    features: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
});

SubscriptionPlan.beforeCreate(async (subscriptionPlan) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingSubscriptionPlan = await SubscriptionPlan.findOne({ where: { id: newId } });
        if (!existingSubscriptionPlan) {
            isUnique = true;
        }
    }
    subscriptionPlan.id = newId;
});

export default SubscriptionPlan; 