import Joi from "joi";
import bcrypt from "bcrypt";
import validator from "../../utils/validator.js";
import Employee from "../../models/employeeModel.js";
import responseHandler from "../../utils/responseHandler.js";

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
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            phone: Joi.string().optional(),
            address: Joi.string().optional(),
            joiningDate: Joi.date().optional(),
            leaveDate: Joi.date().optional(),
            department: Joi.string().optional(),
            designation: Joi.string().optional(),
            salary: Joi.number().optional(),
            accountholder: Joi.string().optional(),
            accountnumber: Joi.string().optional(),
            bankname: Joi.string().optional(),
            ifsc: Joi.string().optional(),
            banklocation: Joi.string().optional(),
            cv_path: Joi.string().optional(),
            photo_path: Joi.string().optional(),
            role: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const {
                username, email, password, firstName, lastName, phone,
                address, joiningDate, leaveDate, department, designation,
                salary, accountholder, accountnumber, bankname, ifsc,
                banklocation, cv_path, photo_path, role
            } = req.body;

            // Check if email already exists
            const existingEmail = await Employee.findOne({ where: { email } });
            if (existingEmail) {
                return responseHandler.conflict(res, "Email already exists");
            }

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
                role: role || 'employee' // Default role if not provided
            });

            responseHandler.created(res, "Employee created successfully", employee);

        } catch (error) {
            console.error('Error creating employee:', error);
            responseHandler.error(res, error.message);
        }
    }
};