import Feature from "../../models/featureModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
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
            const features = await Feature.findAll();
            return responseHandler.success(res, "Features fetched successfully", features);
        }
        catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}