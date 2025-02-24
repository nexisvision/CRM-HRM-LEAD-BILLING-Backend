import Joi from "joi";
import TransferAccount from "../../models/transferacconutModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const accounts = await TransferAccount.findAll();
            if (!accounts) {
                return responseHandler.error(res, "No transfer accounts found");
            }
            return responseHandler.success(res, "Transfer accounts fetched successfully", accounts);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}

