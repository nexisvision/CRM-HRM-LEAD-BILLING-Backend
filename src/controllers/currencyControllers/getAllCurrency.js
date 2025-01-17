import Joi from "joi";
import Currency from "../../models/currencyModel.js";
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
            const currencies = await Currency.findAll();
            return responseHandler.success(res, "Currencies fetched successfully", currencies);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
};