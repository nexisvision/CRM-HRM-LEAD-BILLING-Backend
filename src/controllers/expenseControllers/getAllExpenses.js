import Joi from "joi";
import Expense from "../../models/expenseModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number(),
            limit: Joi.number()
        })
    }),
    handler: async (req, res) => {
        try {
            const expenses = await Expense.findAll();
            return responseHandler.success(res, "Expenses fetched successfully", expenses);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}