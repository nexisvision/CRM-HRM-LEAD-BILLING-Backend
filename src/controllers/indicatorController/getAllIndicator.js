import Joi from "joi";
import Indicator from "../../models/IndicatorModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const indicators = await Indicator.findAll();
            if (!indicators) {
                return responseHandler.error(res, "Indicators not found");
            }
            return responseHandler.success(res, "Indicators fetched successfully", indicators);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}