import Joi from "joi";
import validator from "../../utils/validator.js";
import DeductionOption from "../../models/DeductionOptionModel.js";
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
            const deductionOption = await DeductionOption.findAll();
            if (!deductionOption) {
                return responseHandler.error(res, "Deduction option not found");
            }
            return responseHandler.success(res, "Deduction option fetched successfully", deductionOption);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}