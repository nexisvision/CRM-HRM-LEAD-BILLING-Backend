import Joi from "joi";
import Appreciation from "../../models/appreciationModel.js";
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
            const appreciations = await Appreciation.findAll();
            return responseHandler.success(res, "Appreciations fetched successfully", appreciations);
        } catch (error) {
            return responseHandler.error(res, error.message)
        }
    }
}