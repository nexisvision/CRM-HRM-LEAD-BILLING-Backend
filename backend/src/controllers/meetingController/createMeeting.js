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
            endTime: Joi.string().required(),
            location: Joi.string(),
            status: Joi.string().valid('scheduled', 'completed', 'cancelled').default('scheduled')
        })
    }),
    handler: async (req, res) => {
        try {
            const { title, date, startTime, endTime, description, location, status } = req.body;
            const meeting = await Meeting.create({
                title,
                description,
                date,
                startTime,
                endTime,
                location,
                status,
                createdBy: req.user?.id
            });

            return responseHandler.success(res, "Meeting created successfully", meeting);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}
