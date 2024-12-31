import Joi from "joi";
import Employee from "../../models/employeeModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Employee ID must be a string',
                'string.empty': 'Employee ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const employee = await Employee.findByPk(id);
            if (!employee) {
                return responseHandler.notFound(res, "Employee not found");
            }

            await employee.destroy();
            responseHandler.success(res, "Employee deleted successfully", employee);
        } catch (error) {
            console.error('Error deleting employee:', error);
            responseHandler.error(res, error.message);
        }
    }
};
