import Joi from "joi";
import validator from "../../utils/validator.js";
import Feature from "../../models/featureModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            featureName: Joi.string().required()
        })
    }),

    handler: async (req, res) => {
        try {
            const { featureName } = req.body;
            const feature = await Feature.create({ featureName, created_by: req.user.id });
            return responseHandler.success(res, "Feature created successfully", feature);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}