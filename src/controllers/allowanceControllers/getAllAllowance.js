import Joi from "joi";
import validator from "../../utils/validator.js";
import Allowance from "../../models/allowanceModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const allowances = await Allowance.findAll();
            if (!allowances) {
                return responseHandler.success(res, "Allowances not found");
            }
            return responseHandler.success(res, "Allowances fetched successfully", allowances);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}