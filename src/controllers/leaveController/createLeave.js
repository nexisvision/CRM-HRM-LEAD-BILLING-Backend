import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
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
            const { employeeId, startDate, endDate, leaveType, reason, isHalfDay } = req.body;

            // Validation for half-day leave:
            if (isHalfDay) {
                if (startDate.getTime() !== endDate.getTime()) {
                    throw new Error('Half-day leave must have the same start and end date');
                }
            }

            const leave = await Leave.create({
                employeeId,
                startDate,
                endDate,
                leaveType,
                reason,
                isHalfDay,
                created_by: req.user?.username,
            });

            return responseHandler.created(res, "Leave request created successfully", leave);
        } catch (error) {

            return responseHandler.error(res, error.message);
        }
    }
};