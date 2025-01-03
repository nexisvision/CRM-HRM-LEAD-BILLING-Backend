import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            startDate: Joi.date().required(),
            startTime: Joi.string().required(),
            endDate: Joi.date().required(),
            endTime: Joi.string().required(),
            comment: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { startDate, startTime, endDate, endTime, comment } = req.body;

            const attendance = await Attendance.create({
                startDate,
                startTime,
                endDate,
                endTime,
                comment,
                created_by: req.user?.username,
            });

            responseHandler.created(res, "Attendance marked successfully", attendance);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
