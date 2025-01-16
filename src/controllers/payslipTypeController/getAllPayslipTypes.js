import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import PayslipType from "../../models/payslipTypeModel.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const payslipTypes = await PayslipType.findAll();
            if (!payslipTypes) {
                return responseHandler.error(res, "No payslip types found");
            }
            return responseHandler.success(res, "Payslip fetched successfully", payslipTypes);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}