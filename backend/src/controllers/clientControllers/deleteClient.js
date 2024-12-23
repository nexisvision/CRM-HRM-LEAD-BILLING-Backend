import Joi from "joi";
import Client from "../../models/clientModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Client ID must be a string',
                'string.empty': 'Client ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const client = await Client.findByPk(id);
            if (!client) {
                return responseHandler.error(res, "Client not found");
            }

            await client.destroy();
            return responseHandler.success(res, "Client deleted successfully", client);
        } catch (error) {
            return responseHandler.error(res, error.errors[0].message);
        }
    }
}