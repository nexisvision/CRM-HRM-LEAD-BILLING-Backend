import Joi from "joi";
import Users from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const User = await Users.findAll();
            if (!User) {
                return responseHandler.notFound(res, "User not found");
            }
            return responseHandler.success(res, "User fetched successfully", User);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
