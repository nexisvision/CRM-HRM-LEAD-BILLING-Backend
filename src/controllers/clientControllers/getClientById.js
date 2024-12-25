import Joi from "joi";
import Client from "../../models/clientModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

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
                return responseHandler.error(res, "Client not found", 404);
            }

            responseHandler.success(res, "Client fetched successfully", client);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};