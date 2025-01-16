import Joi from "joi";
import validator from "../../utils/validator.js";
import LoanOption from "../../models/LoanOptionModel.js";
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
            const loanOption = await LoanOption.findAll();
            if (!loanOption) {
                return responseHandler.error(res, "Loan option not found");
            }
            return responseHandler.success(res, "Loan option fetched successfully", loanOption);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}