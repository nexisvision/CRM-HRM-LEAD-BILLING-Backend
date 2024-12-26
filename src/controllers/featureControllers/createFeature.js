import Feature from "../../models/featureModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            featureName: Joi.string().required()
            .messages({
                'string.empty': 'Please provide a feature name.'
            }),
        })
    }),

    handler: async (req, res) => {
        try {
        const { featureName } = req.body;
        console.log(featureName); 
            const feature = await Feature.create({ featureName });
            responseHandler.success(res, "Feature created successfully", feature);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}