import Joi from "joi";
import Client from "../../models/clientModel.js";
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
            const clients = await Client.findAll();
            responseHandler.success(res, "Clients fetched successfully", clients);
        } catch (error) {
            responseHandler.error(res, error.errors[0].message);
        }
    }
}