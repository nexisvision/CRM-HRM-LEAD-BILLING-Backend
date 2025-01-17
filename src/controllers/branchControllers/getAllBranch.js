import Joi from "joi";
import Branch from "../../models/branchModel.js";
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
            const branches = await Branch.findAll();
            if (!branches) {
                return responseHandler.error(res, "Branches not found");
            }
            return responseHandler.success(res, "Branches fetched successfully", branches);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};