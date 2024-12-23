import Joi from "joi";
import EventSetup from "../../models/eventsetupModel.js";
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
            const events = await EventSetup.findAll();
            responseHandler.success(res, "Events fetched successfully", events);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}