import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            leaveType: Joi.string().valid('sick', 'casual', 'annual', 'other').required(),
            reason: Joi.string().required(),
            status: Joi.string().valid('pending', 'approved', 'rejected').default('pending')
        })
    }),
    handler: async (req, res) => {
        try {
            const { startDate, endDate, leaveType, reason, status } = req.body;

            const leave = await Leave.create({
                startDate,
                endDate,
                leaveType,
                reason,
                status,
                created_by: req.user?.username
            });

            responseHandler.created(res, "Leave request created successfully", leave);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};
