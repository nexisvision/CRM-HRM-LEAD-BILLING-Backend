import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
// import Employee from "../../models/employeeModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const attendances = await Attendance.findAll();
            responseHandler.success(res, "Attendances fetched successfully", attendances);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
