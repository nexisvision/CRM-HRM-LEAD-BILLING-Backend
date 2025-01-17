import Joi from "joi";
import Ticket from "../../models/ticketModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const tickets = await Ticket.findAll();
            if (!tickets) {
                return responseHandler.error(res, "No tickets found");
            }
            return responseHandler.success(res, "Tickets fetched successfully", tickets);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}