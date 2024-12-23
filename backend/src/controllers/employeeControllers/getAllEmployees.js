import Joi from "joi";
import Employee from "../../models/employeeModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const employees = await Employee.findAll();
            responseHandler.success(res, 'Employees retrieved successfully', employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
            responseHandler.error(res, 'Error fetching employees');
        }
    }
};
