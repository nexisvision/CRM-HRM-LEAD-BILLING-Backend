import Joi from "joi";
import Ticket from "../../models/ticketModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return responseHandler.error(res, "Ticket not found");
            }
            await ticket.destroy();
            return responseHandler.success(res, "Ticket deleted successfully", ticket);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}