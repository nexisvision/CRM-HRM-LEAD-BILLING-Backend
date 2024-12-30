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
            }),
            employee: Joi.string().required().messages({
                'string.base': 'Employee must be a string',
                'string.empty': 'Employee is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { dealId, employee } = req.params;

            // Check if deal exists
            const deal = await Deal.findByPk(dealId);
            if (!deal) {
                return responseHandler.notFound(res, "Deal not found");
            }
            const dealUser = await DealUser.findOne({
                where: {
                    id: employeeId,
                    dealId: dealId
                }
            });
            if (!dealUser) {
                return responseHandler.notFound(res, "Deal user not found");
            }

            // Update employee's dealIds array by removing the dealId
            await Employee.update(
                {
                    dealIds: employeeExists.dealIds.filter(id => id !== dealId)
                },
                {
                    where: { username: employee }
                }
            );

            responseHandler.success(res, "Deal unassigned from employee successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}