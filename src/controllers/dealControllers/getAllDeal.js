import Joi from "joi";
import Deal from "../../models/dealModel.js";
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
            const deals = await Deal.findAll();
            responseHandler.success(res, "Deals fetched successfully", deals);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
}