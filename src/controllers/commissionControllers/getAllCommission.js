import Joi from "joi";
import validator from "../../utils/validator.js";
import Commission from "../../models/commissionModel.js";
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
            const commissions = await Commission.findAll();
            if (!commissions) {
                return responseHandler.success(res, "Commissions not found");
            }
            return responseHandler.success(res, "Commissions fetched successfully", commissions);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}