import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import validator from "../../utils/validator.js";
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
            const leaves = await Leave.findAll();
            return responseHandler.success(res, "Leaves fetched successfully", leaves);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};