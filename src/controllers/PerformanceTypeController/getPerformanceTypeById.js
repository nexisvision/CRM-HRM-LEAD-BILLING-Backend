import Joi from "joi";
import PerformanceType from "../../models/PerformanceTypeModel.js";
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
            const performanceType = await PerformanceType.findByPk(id);
            if (!performanceType) {
                return responseHandler.error(res, "Performance type not found");
            }
            return responseHandler.success(res, "Performance fetched successfully", performanceType);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}