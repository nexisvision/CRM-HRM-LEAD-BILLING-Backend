import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import EventSetup from "../../models/eventsetupModel.js";
export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Event ID must be a string',
                'string.empty': 'Event ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            const event = await EventSetup.findByPk(id);
            if (!event) {
                return responseHandler.error(res, "Event not found");
            }
            await event.destroy();
            responseHandler.success(res, "Event deleted successfully", event);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}   