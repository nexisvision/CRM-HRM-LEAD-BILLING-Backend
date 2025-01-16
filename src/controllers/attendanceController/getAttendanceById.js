import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const attendance = await Attendance.findByPk(id);

            if (!attendance) {
                responseHandler.notFound(res, "Attendance record not found");
            }

            responseHandler.success(res, "Attendance fetched successfully", attendance);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
};
