import Joi from "joi";
import validator from "../../utils/validator.js";
import Deduction from "../../models/deductionModel.js";
import responseHandler from "../../utils/responseHandler.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
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
            const { deductionOption, title, type, currency, amount } = req.body;
            const EMP = await User.findOne({ where: { id: req.user?.id } });
            if (!EMP) {
                return responseHandler.error(res, "Employee not found");
            }
            const existingDeduction = await Deduction.findOne({ where: { employeeId: EMP.employeeId } });
            if (existingDeduction) {
                return responseHandler.error(res, "Deduction already exists");
            }
            const deduction = await Deduction.create({
                employeeId: EMP.employeeId,
                deductionOption,
                title,
                type,
                currency,
                amount,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Deduction created successfully", deduction);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}