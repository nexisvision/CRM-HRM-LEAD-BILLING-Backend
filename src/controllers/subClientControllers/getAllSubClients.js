import Joi from "joi";
import SubClient from "../../models/subClientModel.js";
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
            const subClients = await SubClient.findAll();
            responseHandler.success(res, "SubClients fetched successfully", subClients);
        } catch (error) {
            responseHandler.error(res, error.errors[0].message);
        }
    }
}