import Joi from "joi";
import validator from "../../utils/validator.js";
import Allowance from "../../models/deductionModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            deductionOption: Joi.string().required(),
            title: Joi.string().required(),
            type: Joi.string().required(),
            currency: Joi.string().required(),
            amount: Joi.number().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { deductionOption, title, type, currency, amount } = req.body;
            const deduction = await Allowance.findByPk(id);
            if (!deduction) {
                return responseHandler.notFound(res, 'Allowance not found');
            }

            await deduction.update({ deductionOption, title, type, currency, amount, updated_by: req.user?.username });

            return responseHandler.success(res, 'Allowance updated successfully', deduction);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}