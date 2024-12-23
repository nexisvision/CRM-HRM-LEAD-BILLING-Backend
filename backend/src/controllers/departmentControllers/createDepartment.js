import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Department from "../../models/departmentModel.js";

export default {
    validator: validator({
        body: Joi.object({
            department_name: Joi.string()
                .required()
                .pattern(/^[a-zA-Z\s]+$/)
                .min(2)
                .max(50)
            .messages({
                'string.pattern.base': 'Department name must contain only letters and spaces',
                'string.min': 'Department name must be at least 2 characters long',
                'string.max': 'Department name cannot exceed 50 characters',
                'string.empty': 'Department name is required'
                })
        }),
    }),
    handler: async (req, res) => {
        try {
            const { department_name } = req.body;

            // Check if designation already exists
                const existingDepartment = await Department.findOne({
                where: { department_name }
            });

            if (existingDepartment) {
                return responseHandler.error(res, "Department name already exists");
            }

           const department = await Department.create({ department_name });
                responseHandler.success(res, "Department created successfully", department);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
}
}