import Contract from "../../models/contractModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {

            const contracts = await Contract.findAll();
            responseHandler.success(res, "Contracts fetched successfully", contracts);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}