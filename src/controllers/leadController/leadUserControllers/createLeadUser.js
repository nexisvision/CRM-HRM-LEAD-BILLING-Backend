import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";
import Joi from "joi";
import LeadUser from "../../../models/dealandleadUserModel.js";
import Lead from "../../../models/leadModel.js";
import Employee from "../../../models/employeeModel.js";

export default {
    validator: validator({
        params: Joi.object({
            leadId: Joi.string().required().messages({
                'string.base': 'Lead ID must be a string',
                'string.empty': 'Lead ID is required'
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
            const { leadId } = req.params;
            const { employee } = req.body;

            // Check if lead exists
            const lead = await Lead.findByPk(leadId);
            if (!lead) {
                return responseHandler.notFound(res, "Lead not found");
            }

            // Check if employee exists
            const employeeExists = await Employee.findOne({ where: { username: employee } });
            if (!employeeExists) {
                return responseHandler.notFound(res, "Employee not found");
            }

            const leadUser = await LeadUser.create({ employee, leadId });
            responseHandler.success(res, "Lead user created successfully", leadUser);
        } catch (error) {
            console.error('Error creating lead user:', error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}