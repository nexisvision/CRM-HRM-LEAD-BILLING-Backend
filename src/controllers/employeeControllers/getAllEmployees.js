import Joi from "joi";
import User from "../../models/userModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const employees = await User.findAll();
            responseHandler.success(res, 'Employees retrieved successfully', employees);
        } catch (error) {
            responseHandler.error(res, 'Error fetching employees');
        }
    }
};
