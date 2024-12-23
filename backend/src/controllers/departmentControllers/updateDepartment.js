import Department from "../../models/departmentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            // department_id: Joi.string().required(),
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
        })
    }),
    handler: async (req, res) => {
        const { department_name } = req.body;
        try {
            const department = await Department.findByPk(req.params.id);
            if (!department) {
                return responseHandler.error(res, "Department not found");
            }
            await department.update({ department_name });
            responseHandler.success(res, "Department updated successfully", department);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
