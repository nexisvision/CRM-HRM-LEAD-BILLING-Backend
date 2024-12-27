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
            endDate: Joi.date().optional().allow('', null),
            endTime: Joi.string().optional().allow('', null),
            comment: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { endDate, endTime, comment } = req.body;

            const attendance = await Attendance.findByPk(id);
            if (!attendance) {
                return responseHandler.notFound(res, "Attendance record not found");
            }

            await attendance.update({
                endDate,
                endTime,
                comment,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Attendance updated successfully", attendance);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
