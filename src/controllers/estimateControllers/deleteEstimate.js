import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Estimate from "../../models/estimateModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const estimate = await Estimate.findByPk(id);

            if (!estimate) {
                return responseHandler.notFound(res, "Estimate not found");
            }

            await estimate.destroy();

            responseHandler.success(res, "Estimate deleted successfully", estimate);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};   