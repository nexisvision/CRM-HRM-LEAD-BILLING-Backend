import Joi from "joi";
import Ticket from "../../models/ticketModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            requestor: Joi.string().required(),
            assignGroup: Joi.string().optional(),
            agent: Joi.string().allow(null),
            project: Joi.string().allow(null),
            type: Joi.string().allow(null),
            ticketSubject: Joi.string().required(),
            description: Joi.string().required(),
            files: Joi.object().allow(null),
            priority: Joi.string().allow(null),
            status: Joi.string().allow(null),
            channelName: Joi.string().allow(null),
            tag: Joi.string().allow(null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { requestor, assignGroup, agent, status,project, type, ticketSubject, description, files, priority, channelName, tag } = req.body;
            const ticket = await Ticket.create({ requestor, assignGroup, status,agent, project, type, ticketSubject, description, files, priority, channelName, tag, created_by: req.user?.username });
            return responseHandler.success(res, "Ticket created successfully", ticket);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}