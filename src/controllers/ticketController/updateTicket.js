import Joi from "joi";
import Ticket from "../../models/ticketModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
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
            const { id } = req.params;
            const { requestor, assignGroup, agent, status, project, type, ticketSubject, description, files, priority, channelName, tag } = req.body;
            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return responseHandler.error(res, "Ticket not found");
            }
            await ticket.update({ requestor, assignGroup, status, agent, project, type, ticketSubject, description, files, priority, channelName, tag, updated_by: req.user?.username });
            return responseHandler.success(res, "Ticket updated successfully", ticket);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}