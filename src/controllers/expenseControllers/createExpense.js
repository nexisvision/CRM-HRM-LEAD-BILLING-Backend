import Joi from "joi";
import Expense from "../../models/expenseModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            item: Joi.string().required(),
            price: Joi.number().required(),
            currency: Joi.string().required(),
            purchase_date: Joi.date().required(),
            employee: Joi.string().required(),
            project: Joi.string().required(),
            bill: Joi.string().optional().allow('', null),
            description: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { item, price, currency, purchase_date, employee, project, bill, description } = req.body;
            const expense = await Expense.create({ related_id: id, item, price, currency, purchase_date, employee, project, bill, description, created_by: req.user?.username });
            return responseHandler.success(res, "Expense created successfully", expense);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}