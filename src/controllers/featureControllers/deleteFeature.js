import Joi from "joi";
import Feature from "../../models/featureModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const feature = await Feature.findByPk(id);
            if (!feature) {
                responseHandler.error(res, "Feature not found");
            }
            await feature.destroy();
            responseHandler.success(res, "Feature deleted successfully", feature);
        }
        catch (error) {
            responseHandler.error(res, "Internal server error");
        }
    }
}