import Joi from "joi";
import Lead from "../../models/leadModel.js";
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
            const leads = await Lead.findAll();
            return responseHandler.success(res, "Leads fetched successfully", leads);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}