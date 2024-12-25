import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import Employee from "../../models/employeeModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            employee_id: Joi.string().required(),
            startDate: Joi.date().required(),
            startTime: Joi.string().required(),
            endDate: Joi.date().required(),
            endTime: Joi.string().required(),
            comment: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { employee_id, startDate, startTime, endDate, endTime, comment } = req.body;

            // Check if user exists
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                return responseHandler.notFound(res, "User not found");
            }

            // Check if attendance already exists for this date
            const existingAttendance = await Attendance.findOne({
                where: {
                    employee_id,
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
                employee_id,
                startDate,
                startTime,
                endDate,
                endTime,
                comment,
                created_by: req.user?.id
            });

            responseHandler.created(res, "Attendance marked successfully", attendance);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
