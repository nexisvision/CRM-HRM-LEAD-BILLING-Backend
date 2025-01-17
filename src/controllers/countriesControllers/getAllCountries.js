import Country from "../../models/countriesModel.js";
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

            const countries = await Country.findAll();
            return responseHandler.success(res, "Countries fetched successfully", countries);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}