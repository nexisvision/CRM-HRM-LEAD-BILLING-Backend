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
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const employee = await User.findByPk(id);

            if (!employee) {
                return responseHandler.error(res, "Employee not found");
            }

            responseHandler.success(res, "Employee fetched successfully", employee);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};