import Joi from "joi";
import GoalType from "../../models/GoalTypeModel.js";
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
            const goalType = await GoalType.findAll();
            if (!goalType) {
                return responseHandler.error(res, "Goal types not found");
            }
            return responseHandler.success(res, "Goal types fetched successfully", goalType);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}