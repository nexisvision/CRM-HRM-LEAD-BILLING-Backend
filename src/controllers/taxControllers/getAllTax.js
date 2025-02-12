import Tax from "../../models/taxModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const taxes = await Tax.findAll();
            return responseHandler.success(res, "Taxes fetched successfully", taxes);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}