import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            department: Joi.string().required(),
            employee: Joi.array().items(Joi.string()).required(),
            startDate: Joi.date().required(),
            startTime: Joi.string().required(),
            endDate: Joi.date().required(),
            endTime: Joi.string().required(),
            late: Joi.string().optional().allow('', null),
            halfDay: Joi.string().optional().allow('', null),
            working_from: Joi.string().optional().allow('', null),
            comment: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { department, employee, startDate, startTime, endDate, endTime, late, halfDay, working_from, comment } = req.body;

            const attendance = await Attendance.create({
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
                created_by: req.user?.username,
            });

            return responseHandler.created(res, "Attendance marked successfully", attendance);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};
