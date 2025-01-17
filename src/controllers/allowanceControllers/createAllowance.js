import Joi from "joi";
import validator from "../../utils/validator.js";
import Allowance from "../../models/allowanceModel.js";
import responseHandler from "../../utils/responseHandler.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        body: Joi.object({
            allowanceOption: Joi.string().required(),
            title: Joi.string().required(),
            type: Joi.string().required(),
            currency: Joi.string().required(),
            amount: Joi.number().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { allowanceOption, title, type, currency, amount } = req.body;
            const EMP = await User.findOne({ where: { id: req.user?.id } });
            if (!EMP) {
                return responseHandler.error(res, "Employee not found");
            }
            const existingAllowance = await Allowance.findOne({ where: { employeeId: EMP.employeeId } });
            if (existingAllowance) {
                return responseHandler.error(res, "Allowance already exists");
            }
            const allowance = await Allowance.create({
                employeeId: EMP.employeeId,
                allowanceOption,
                title,
                type,
                currency,
                amount,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Allowance created successfully", allowance);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}