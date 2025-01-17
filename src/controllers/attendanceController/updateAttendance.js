import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            department: Joi.string().optional().allow('', null),
            employee: Joi.object().optional().allow('', null),
            startDate: Joi.date().optional().allow('', null),
            startTime: Joi.string().optional().allow('', null),
            endDate: Joi.date().optional().allow('', null),
            endTime: Joi.string().optional().allow('', null),
            late: Joi.string().optional().allow('', null),
            halfDay: Joi.string().optional().allow('', null),
            working_from: Joi.string().optional().allow('', null),
            comment: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { department, employee, startDate, startTime, endDate, endTime, late, halfDay, working_from, comment } = req.body;

            const attendance = await Attendance.findByPk(id);
            if (!attendance) {
                return responseHandler.notFound(res, "Attendance record not found");
            }

            await attendance.update({
                department,
                employee,
                startDate,
                startTime,
                endDate,
                endTime,
                late,
                halfDay,
                working_from,
                comment,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Attendance updated successfully", attendance);
        } catch (error) {

            return responseHandler.error(res, error.message);
        }
    }
};
