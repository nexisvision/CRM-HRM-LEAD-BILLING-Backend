import Joi from "joi";
import validator from "../../utils/validator.js";
import Loan from "../../models/loanModel.js";
import responseHandler from "../../utils/responseHandler.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
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
            const { loanOption, title, type, currency, amount, reason } = req.body;
            const EMP = await User.findOne({ where: { id: req.user?.id } });
            if (!EMP) {
                return responseHandler.error(res, "Employee not found");
            }
            const existingLoan = await Loan.findOne({ where: { employeeId: EMP.employeeId } });
            if (existingLoan) {
                return responseHandler.error(res, "Loan already exists");
            }
            const loan = await Loan.create({
                employeeId: EMP.employeeId,
                loanOption,
                title,
                type,
                currency,
                amount,
                reason,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Loan created successfully", loan);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}