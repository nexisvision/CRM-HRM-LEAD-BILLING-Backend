import Joi from "joi";
import validator from "../../utils/validator.js";
import Loan from "../../models/loanModel.js";
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
            const loans = await Loan.findAll();
            if (!loans) {
                return responseHandler.success(res, "Loans not found");
            }
            return responseHandler.success(res, "Loans fetched successfully", loans);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}