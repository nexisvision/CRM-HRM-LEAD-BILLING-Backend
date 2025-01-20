import Joi from "joi";
import validator from "../../utils/validator.js";
import GoalTracking from "../../models/goalTrackingModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),

    handler: async (req, res) => {
        try {
            const goalTracking = await GoalTracking.findAll();
            if (!goalTracking) {
                return responseHandler.error(res, "Goal Tracking not found");
            }
            return responseHandler.success(res, "Goal Tracking fetched successfully", goalTracking);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}