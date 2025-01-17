import Joi from "joi";
import User from "../../models/userModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            username: Joi.string().min(3).max(30),
            email: Joi.string().email(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            await user.update({ username, email });
            return responseHandler.success(res, "User updated successfully", user);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};