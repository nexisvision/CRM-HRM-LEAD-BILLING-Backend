import Joi from "joi";
import bcrypt from "bcrypt";
import validator from "../../utils/validator.js";
import Employee from "../../models/employeeModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import generateId from "../../middlewares/generatorId.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required().messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username is required'
            }),
            email: Joi.string().email().required().messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Invalid email format'
            }),
            password: Joi.string()
                .required()
                .min(8)
                .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$'))
                .messages({
                    'string.base': 'Password must be a string',
                    'string.empty': 'Password is required',
                    'string.min': 'Password must be at least 8 characters',
                    'string.pattern.base': 'Password must contain only letters, numbers and special characters'
                }),
            firstName: Joi.string().optional().allow('', null),
            lastName: Joi.string().optional().allow('', null),
            phone: Joi.string().optional().allow('', null),
            address: Joi.string().optional().allow('', null),
            joiningDate: Joi.date().optional().allow('', null),
            leaveDate: Joi.date().optional().allow('', null),
            department: Joi.string().optional().allow('', null),
            designation: Joi.string().optional().allow('', null),
            salary: Joi.number().optional().allow('', null),
            accountholder: Joi.string().optional().allow('', null),
            accountnumber: Joi.number().optional().allow('', null),
            bankname: Joi.string().optional().allow('', null),
            ifsc: Joi.number().optional().allow('', null),
            banklocation: Joi.string().optional().allow('', null),
            cv_path: Joi.string().optional().allow('', null),
            photo_path: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const {
                username, email, password, firstName, lastName, phone,
                address, joiningDate, leaveDate, department, designation,
                salary, accountholder, accountnumber, bankname, ifsc,
                banklocation, cv_path, photo_path, role_name } = req.body;

            // Check if email already exists
            const existingUsername = await Employee.findOne({
                where: { username }
            });

            if (existingUsername) {
                return responseHandler.error(res, "Username already exists.");
            }

            const existingEmail = await Employee.findOne({
                where: { email }
            });

            if (existingEmail) {
                return responseHandler.error(res, "Email already exists.");
            }

            const [role] = await Role.findOrCreate({
                where: { role_name: role_name || 'employee' },
                defaults: { id: generateId() }
            });

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create employee with all fields
            const employee = await Employee.create({
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
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
                cv_path,
                photo_path,
                role_id: role.id,
                created_by: req.user?.username,
                updated_by: req.user?.username
            });

            responseHandler.created(res, "Employee created successfully", employee);

        } catch (error) {
            console.error('Error creating employee:', error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};