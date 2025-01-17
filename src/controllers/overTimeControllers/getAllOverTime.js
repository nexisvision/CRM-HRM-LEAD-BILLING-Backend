import Joi from "joi";
import validator from "../../utils/validator.js";
import OverTime from "../../models/overTimeModel.js";
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
            const overTimes = await OverTime.findAll();
            if (!overTimes) {
                return responseHandler.success(res, "OverTimes not found");
            }
            return responseHandler.success(res, "OverTimes fetched successfully", overTimes);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}