import Joi from "joi";
import validator from "../../utils/validator.js";
import Commission from "../../models/commissionModel.js";
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
            const existingCommission = await Commission.findOne({ where: { employeeId: EMP.employeeId } });
            if (existingCommission) {
                return responseHandler.error(res, "Commission already exists");
            }
            const commission = await Commission.create({
                employeeId: EMP.employeeId,
                title,
                type,
                currency,
                amount,
            });
            return responseHandler.success(res, "Commission created successfully", commission);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}