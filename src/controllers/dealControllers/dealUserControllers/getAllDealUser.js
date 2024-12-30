import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";
import Joi from "joi";
import Deal from "../../../models/dealModel.js";
import Employee from "../../../models/employeeModel.js";

export default {
    validator: validator({
        params: Joi.object({
            dealId: Joi.string().required().messages({
                'string.base': 'Deal ID must be a string',
                'string.empty': 'Deal ID is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { dealId } = req.params;
            const { page, limit } = req.query;
            const offset = (page - 1) * limit;
            const deals = await DealUser.findAll({ where: { dealId }, offset, limit });
            responseHandler.success(res, "Deal users fetched successfully", deals);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}
