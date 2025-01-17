import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const client = await User.findByPk(id);
            if (!client) {
                return responseHandler.error(res, "Client not found");
            }

            await client.destroy();
            return responseHandler.success(res, "Client deleted successfully", client);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}