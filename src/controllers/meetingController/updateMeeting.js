import Joi from "joi";
import validator from "../../utils/validator.js";
import Meeting from "../../models/meetingModel.js";
import responseHandler from "../../utils/responseHandler.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            title: Joi.string().optional(),
            date: Joi.date().optional(),
            startTime: Joi.string().optional(),
            endTime: Joi.string().optional(),
            description: Joi.string().optional(),
            location: Joi.string().optional(),
            status: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        const { id } = req.params;
        const { title, date, startTime, endTime, description, location, status } = req.body;
        try {
            const meeting = await Meeting.findByPk(id);
            if (!meeting) {
                return responseHandler.notFound(res, "Meeting not found");
            }
            await meeting.update({ title, date, startTime, endTime, description, location, status });
            return responseHandler.success(res, "Meeting updated successfully", meeting);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}