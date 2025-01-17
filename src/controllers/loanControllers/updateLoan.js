import Joi from "joi";
import validator from "../../utils/validator.js";
import Loan from "../../models/loanModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            loanOption: Joi.string().required(),
            title: Joi.string().required(),
            type: Joi.string().required(),
            currency: Joi.string().required(),
            amount: Joi.number().required(),
            reason: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { loanOption, title, type, currency, amount, reason } = req.body;
            const loan = await Loan.findByPk(id);
            if (!loan) {
                return responseHandler.notFound(res, 'Loan not found');
            }

            await loan.update({ loanOption, title, type, currency, amount, reason, updated_by: req.user?.username });

            return responseHandler.success(res, 'Loan updated successfully', loan);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}