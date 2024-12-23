import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Designation from "../../models/designationModel.js";

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
        })
    }),
    handler: async (req, res) => {
        const { designation_name } = req.body;
        try {
            const designation = await Designation.findByPk(req.params.id);
            if (!designation) {
                return responseHandler.error(res, "Designation not found");
            }
            await designation.update({ designation_name });
            responseHandler.success(res, "Designation updated successfully", designation);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}