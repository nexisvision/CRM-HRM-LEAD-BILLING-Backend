import Joi from "joi";
import LeaveType from "../../models/leaveTypeModel.js";
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
            const leaveType = await LeaveType.findAll();
            if (!leaveType) {
                return responseHandler.error(res, "Leave types not found");
            }
            return responseHandler.success(res, "Leave types fetched successfully", leaveType);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}