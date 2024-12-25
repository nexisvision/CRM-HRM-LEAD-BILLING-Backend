import Joi from "joi";
import Client from "../../models/clientModel.js";
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
            role_id: Joi.string()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email, role_id } = req.body;

            const client = await Client.findByPk(id);
            if (!client) {
                return responseHandler.notFound(res, "Client not found");
            }

            await client.update({ username, email, role_id });
            responseHandler.success(res, "Client updated successfully", client);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};