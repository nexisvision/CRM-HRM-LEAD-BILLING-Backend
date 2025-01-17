import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import EventSetup from "../../models/eventsetupModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
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
            return responseHandler.success(res, "Event deleted successfully", event);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}   