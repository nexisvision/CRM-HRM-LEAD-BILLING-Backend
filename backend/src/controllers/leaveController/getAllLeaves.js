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
            responseHandler.success(res, "Leaves fetched successfully", leaves);
        } catch (error) {
            console.error('Error fetching leaves:', error);
            responseHandler.error(res, error.message);
        }
    }
};