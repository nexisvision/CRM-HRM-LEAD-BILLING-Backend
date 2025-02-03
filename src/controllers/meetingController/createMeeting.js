import Joi from "joi";
import Meeting from "../../models/meetingModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            date: Joi.date().required(),
            startTime: Joi.string().required(),
            endTime: Joi.string().optional().allow("",null),
            meetingLink: Joi.string().optional().allow("",null),
            status: Joi.string().valid('scheduled', 'completed', 'cancelled').default('scheduled')
        })
    }),
    handler: async (req, res) => {
        try {
            const { title, date, startTime, endTime, description, meetingLink, status } = req.body;

            const existingMeeting = await Meeting.findOne({ where: { title, date, startTime, endTime, description, meetingLink, status } });
            if (existingMeeting) {
                return responseHandler.error(res, "Meeting already exists");
            }
            const meeting = await Meeting.create({
                title,
                description,
                date,
                startTime,
                endTime,
                meetingLink,
                status,
                createdBy: req.user?.username
            });

            return responseHandler.success(res, "Meeting created successfully", meeting);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
