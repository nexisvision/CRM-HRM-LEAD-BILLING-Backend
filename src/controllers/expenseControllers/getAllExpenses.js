import Joi from "joi";
import Expense from "../../models/expenseModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const expenses = await Expense.findAll({ where: { related_id: id } });
            responseHandler.success(res, "Expenses fetched successfully", expenses);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}