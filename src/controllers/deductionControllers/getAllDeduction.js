import Joi from "joi";
import validator from "../../utils/validator.js";
import Deduction from "../../models/deductionModel.js";
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
            const deductions = await Deduction.findAll();
            if (!deductions) {
                return responseHandler.success(res, "Deductions not found");
            }
            return responseHandler.success(res, "Deductions fetched successfully", deductions);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}