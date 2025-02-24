import Joi from "joi";
import Account from "../../models/accountModel.js";
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
            const accounts = await Account.findAll();
            if (!accounts) {
                return responseHandler.error(res, "No accounts found");
            }
            return responseHandler.success(res, "Accounts fetched successfully", accounts);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}

