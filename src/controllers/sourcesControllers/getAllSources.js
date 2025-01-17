import Joi from "joi";
import validator from "../../utils/validator.js";
import Sources from "../../models/sourcesModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const sources = await Sources.findAll();
            return responseHandler.success(res, "Sources fetched successfully", sources);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    },

}