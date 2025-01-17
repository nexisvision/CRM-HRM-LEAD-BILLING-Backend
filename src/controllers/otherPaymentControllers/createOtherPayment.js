import Joi from "joi";
import validator from "../../utils/validator.js";
import OtherPayment from "../../models/otherPaymentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        body: Joi.object({
            title: Joi.string().required(),
            type: Joi.string().required(),
            currency: Joi.string().required(),
            amount: Joi.number().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { title, type, currency, amount } = req.body;
            const EMP = await User.findOne({ where: { id: req.user?.id } });
            if (!EMP) {
                return responseHandler.error(res, "Employee not found");
            }
            const existingOtherPayment = await OtherPayment.findOne({ where: { employeeId: EMP.employeeId } });
            if (existingOtherPayment) {
                return responseHandler.error(res, "OtherPayment already exists");
            }
            const otherPayment = await OtherPayment.create({
                employeeId: EMP.employeeId,
                title,
                type,
                currency,
                amount,
            });
            return responseHandler.success(res, "OtherPayment created successfully", otherPayment);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}