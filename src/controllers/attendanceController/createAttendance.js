import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        body: Joi.object({
            startDate: Joi.date().required(),
            startTime: Joi.string().required(),
            endDate: Joi.date().required(),
            endTime: Joi.string().required(),
            comment: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { startDate, startTime, endDate, endTime, comment } = req.body;

            // Check if attendance already exists for this date
            const existingAttendance = await Attendance.findOne({
                where: {
                    [Op.or]: [
                        {
                            startDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        {
                            endDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        }
                    ]
                }
            });

            if (existingAttendance) {
                return responseHandler.error(res, "Attendance already marked for this date");
            }

            const attendance = await Attendance.create({
                startDate,
                startTime,
                endDate,
                endTime,
                comment,
                created_by: req.user?.username,
                updated_by: req.user?.username
            });

            responseHandler.created(res, "Attendance marked successfully", attendance);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
