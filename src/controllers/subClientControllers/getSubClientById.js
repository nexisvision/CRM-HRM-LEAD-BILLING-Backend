import Joi from "joi";
import SubClient from "../../models/subClientModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'subClient ID must be a string',
                'string.empty': 'subClient ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const subClient = await SubClient.findByPk(id);

            if (!subClient) {
                return responseHandler.notFound(res, "subClient not found");
            }

            responseHandler.success(res, "subClient fetched successfully", subClient);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};