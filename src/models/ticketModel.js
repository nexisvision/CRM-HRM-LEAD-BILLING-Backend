import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";


const Ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => generateId()
    },
    requestor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    requestorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assignGroup: {
        type: DataTypes.STRING,
        allowNull: false
    },
    agent: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    project: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    ticketSubject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    files: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    channelName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});

Ticket.beforeCreate(async (ticket) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingTicket = await Ticket.findOne({ where: { id: newId } });
        if (!existingTicket) {
            isUnique = true;
        }
    }
    ticket.id = newId;
});

export default Ticket;