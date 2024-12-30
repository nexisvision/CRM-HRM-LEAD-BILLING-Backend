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
        }),
        body: Joi.object({
            employee: Joi.string().required().messages({
                'string.base': 'Employee must be a string',
                'string.empty': 'Employee is required'
            }),
        })
    }),
    handler: async (req, res) => {
        try {
            const { dealId } = req.params;
            const { employee } = req.body;

            // Check if deal exists
            const deal = await Deal.findByPk(dealId);
            if (!deal) {
                return responseHandler.notFound(res, "Deal not found");
            }

            // Check if employee exists
            const employeeExists = await Employee.findOne({ where: { username: employee } });
            if (!employeeExists) {
                return responseHandler.notFound(res, "Employee not found");
            }

            // Initialize dealIds array if it doesn't exist
            const currentDealIds = employeeExists.dealIds || [];

            // Check if deal is already assigned to employee
            if (currentDealIds.includes(dealId)) {
                return responseHandler.badRequest(res, "Deal is already assigned to this employee");
            }

            // Update employee's dealIds array
            await Employee.update(
                { 
                    dealIds: {...currentDealIds, dealId}
                },
                { 
                    where: { username: employee }
                }
            );

            responseHandler.success(res, "Deal assigned to employee successfully");
        } catch (error) {
            console.error('Error creating deal user:', error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}