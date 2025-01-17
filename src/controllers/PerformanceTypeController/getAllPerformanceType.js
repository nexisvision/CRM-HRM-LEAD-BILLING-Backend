import Joi from "joi";
import PerformanceType from "../../models/PerformanceTypeModel.js";
import responseHandler from "../../utils/responseHandler.js";
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
            const performanceType = await PerformanceType.findAll();
            if (!performanceType) {
                return responseHandler.error(res, "Performance types not found");
            }
            return responseHandler.success(res, "Performance types fetched successfully", performanceType);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}