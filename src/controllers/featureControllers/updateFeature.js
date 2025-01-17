import Joi from "joi";
import validator from "../../utils/validator.js";
import Feature from "../../models/featureModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
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
            return responseHandler.success(res, "Feature updated successfully", feature);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}   