import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import ClientSubscription from "../../models/clientSubscriptionModel.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const AssignedPlans = await ClientSubscription.findAll();
            if (!AssignedPlans) {
                return responseHandler.error(res, "No Assigned Plans found");
            }
            return responseHandler.success(res, "Assigned Plans fetched successfully", AssignedPlans);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}; 