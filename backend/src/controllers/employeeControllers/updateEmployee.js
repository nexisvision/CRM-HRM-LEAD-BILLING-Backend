import Joi from "joi";
import Employee from "../../models/employeeModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Employee ID must be a string',
                'string.empty': 'Employee ID is required',
            })
        }),
        body: Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            username: Joi.string(),
            email: Joi.string().email(),
            phone: Joi.string(),
            address: Joi.string(),
            joiningDate: Joi.date(),
            leaveDate: Joi.date().allow(null),
            department: Joi.string(),
            designation: Joi.string(),
            salary: Joi.number(),
            accountholder: Joi.string(),
            accountnumber: Joi.string(),
            bankname: Joi.string(),
            ifsc: Joi.string(),
            banklocation: Joi.string(),
            role: Joi.string()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const employee = await Employee.findByPk(id);
            if (!employee) {
                return responseHandler.notFound(res, "Employee not found");
            }

            // Check if email is being changed and if it already exists
            if (updateData.email && updateData.email !== employee.email) {
                const existingEmail = await Employee.findOne({ where: { email: updateData.email } });
                if (existingEmail) {
                    return responseHandler.conflict(res, "Email already exists");
                }
            }

            // Check if phone is being changed and if it already exists
            if (updateData.phone && updateData.phone !== employee.phone) {
                const existingPhone = await Employee.findOne({ where: { phone: updateData.phone } });
                if (existingPhone) {
                    return responseHandler.conflict(res, "Phone number already exists");
                }
            }

            // Update employee
            await employee.update(updateData);

            responseHandler.success(res, "Employee updated successfully", employee);
        } catch (error) {
            console.error('Error updating employee:', error);
            responseHandler.error(res, error.message);
        }
    }
};