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
            employee_id: Joi.string().optional(),
            startDate: Joi.date().optional(),
            endDate: Joi.date().optional(),
            leaveType: Joi.string().valid('sick', 'casual', 'annual', 'other').optional(),
            reason: Joi.string().optional(),
            status: Joi.string().valid('pending', 'approved', 'rejected').default('pending'),
            remarks: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { employee_id, startDate, endDate, leaveType, reason, status, remarks } = req.body;

            const leave = await Leave.findByPk(id);
            if (!leave) {
                return responseHandler.notFound(res, "Leave record not found");
            }

            await leave.update({
                employee_id,
                startDate,
                endDate,
                leaveType,
                reason,
                status,
                remarks,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Leave updated successfully", leave);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
