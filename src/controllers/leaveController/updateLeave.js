import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            employeeId: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            leaveType: Joi.string().valid('sick', 'casual', 'annual', 'other').required(),
            reason: Joi.string().required(),
            isHalfDay: Joi.boolean().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { employeeId, startDate, endDate, leaveType, reason, isHalfDay } = req.body;

            const leave = await Leave.findByPk(id);
            if (!leave) {
                return responseHandler.notFound(res, "Leave record not found");
            }

            await leave.update({
                employeeId,
                startDate,
                endDate,
                leaveType,
                reason,
                isHalfDay,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Leave updated successfully", leave);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};
