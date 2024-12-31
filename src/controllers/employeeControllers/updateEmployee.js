import Joi from "joi";
import User from "../../models/userModel.js";
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
            firstName: Joi.string().allow('', null),
            lastName: Joi.string().allow('', null),
            username: Joi.string().allow('', null),
            email: Joi.string().email().allow('', null),
            phone: Joi.string().allow('', null),
            address: Joi.string().allow('', null),
            joiningDate: Joi.date().allow('', null),
            leaveDate: Joi.date().allow(null),
            department: Joi.string().allow('', null),
            designation: Joi.string().allow('', null),
            salary: Joi.number().allow('', null),
            accountholder: Joi.string().allow('', null),
            accountnumber: Joi.number().allow('', null),
            bankname: Joi.string().allow('', null),
            ifsc: Joi.number().allow('', null),
            banklocation: Joi.string().allow('', null),
            role_id: Joi.string().allow('', null),
            updated_by: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { firstName, lastName, username, email, phone, address, joiningDate, leaveDate, department, designation, salary, accountholder, accountnumber, bankname, ifsc, banklocation, role_id, created_by, updated_by } = req.body;

            const employee = await User.findByPk(id);
            if (!employee) {
                return responseHandler.notFound(res, "Employee not found");
            }

            // Check if email is being changed and if it already exists
            if (email && email !== employee.email) {
                const existingEmail = await User.findOne({ where: { email } });
                if (existingEmail) {
                    return responseHandler.conflict(res, "Email already exists");
                }
            }

            // Check if phone is being changed and if it already exists
            if (phone && phone !== employee.phone) {
                const existingPhone = await User.findOne({ where: { phone } });
                if (existingPhone) {
                    return responseHandler.conflict(res, "Phone number already exists");
                }
            }

            // Update employee
                await employee.update({
                firstName,
                lastName,
                username,
                email,
                phone,
                address,
                joiningDate,
                leaveDate,
                department,
                designation,
                salary,
                accountholder,
                accountnumber,
                bankname,
                ifsc,
                banklocation,
                role_id,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Employee updated successfully", employee);
        } catch (error) {
            console.error('Error updating employee:', error);
            responseHandler.error(res, error.message);
        }
    }
};