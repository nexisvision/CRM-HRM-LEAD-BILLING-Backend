import Joi from "joi";
import validator from "../../utils/validator.js";
import AllowanceOption from "../../models/allowanceOptionModel.js";
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
            const allowanceOption = await AllowanceOption.findAll();
            if (!allowanceOption) {
                return responseHandler.error(res, "Allowance option not found");
            }
            return responseHandler.success(res, "Allowance option fetched successfully", allowanceOption);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}