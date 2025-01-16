import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'subClient ',
                'string.empty': 'subClient ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const subClient = await User.findByPk(id);
            if (!subClient) {
                responseHandler.error(res, "subClient not found");
            }

            await subClient.destroy();
            responseHandler.success(res, "subClient deleted successfully", subClient);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}