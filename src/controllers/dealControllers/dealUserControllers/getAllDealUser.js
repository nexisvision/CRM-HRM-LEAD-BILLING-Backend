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

            // Check if deal exists
            const deal = await Deal.findByPk(dealId);
            if (!deal) {
                return responseHandler.notFound(res, "Deal not found");
            }

            // Get all employees with this dealId
            const employees = await Employee.findAll({
                where: {
                    dealIds: {
                        [Op.contains]: [dealId]
                    }
                }
            });

            responseHandler.success(res, "Deal users fetched successfully", employees);
        } catch (error) {
            console.error('Error fetching deal users:', error);
            responseHandler.error(res, error.message);
        }
    }
}
