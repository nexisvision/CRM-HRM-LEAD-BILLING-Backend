import Joi from "joi";
import validator from "../../utils/validator.js";
import Feature from "../../models/featureModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            params: Joi.object({
                id: Joi.string().required().messages({
                    'string.base': 'Feature ID must be a string',
                    'string.empty': 'Feature ID is required',
                })
            }),
            featureName: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        const { id } = req.params;
        const { featureName } = req.body;
        try {
            const feature = await Feature.findByPk(id);
            if (!feature) {
                return responseHandler.error(res, "Feature not found");
            }
            await feature.update({ featureName });
            responseHandler.success(res, "Feature updated successfully", feature);
        } catch (error) {
            responseHandler.error(res, error.errors[0].message);
        }
    }
}   