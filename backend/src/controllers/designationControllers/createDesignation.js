import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import Designation from "../../models/designationModel.js";
import validator from "../../utils/validator.js";
export default {
    validator: validator({
        body: Joi.object({
            designation_name: Joi.string()
                .required()
                .pattern(/^[a-zA-Z\s]+$/)
                .min(2)
                .max(50)
                .messages({
                    'string.pattern.base': 'Designation name must contain only letters and spaces',
                    'string.min': 'Designation name must be at least 2 characters long',
                    'string.max': 'Designation name cannot exceed 50 characters',
                    'string.empty': 'Designation name is required'
                })
        }),
    }),
    handler: async (req, res) => {
        try {
            const { designation_name } = req.body;

            // Check if designation already exists
            const existingDesignation = await Designation.findOne({
                where: { designation_name }
            });

            if (existingDesignation) {
                return responseHandler.error(res, "Designation name already exists");
            }

            const designation = await Designation.create({ designation_name });
            responseHandler.success(res, "Designation created successfully", designation);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}