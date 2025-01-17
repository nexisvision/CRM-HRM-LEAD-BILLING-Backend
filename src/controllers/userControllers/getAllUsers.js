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
            const users = await User.findAll();
            return responseHandler.success(res, "Users fetched successfully", users);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}