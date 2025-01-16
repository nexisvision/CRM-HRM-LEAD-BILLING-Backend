import Joi from "joi";
import Expense from "../../models/expenseModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().optional()
        }),
        body: Joi.object({
            item: Joi.string().optional(),
            price: Joi.number().optional(),
            currency: Joi.string().optional(),
            purchase_date: Joi.date().optional(),
            employee: Joi.string().optional(),
            project: Joi.string().optional(),
            bill: Joi.string().optional().allow('', null),
            description: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { item, price, currency, purchase_date, employee, project, bill, description } = req.body;
            const expense = await Expense.findByPk(id);
            if (!expense) {
                responseHandler.error(res, "Expense not found");
            }
            await expense.update({ item, price, currency, purchase_date, employee, project, bill, description, updated_by: req.user?.username });
            responseHandler.success(res, "Expense updated successfully", expense);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}