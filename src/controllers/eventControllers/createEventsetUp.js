import Joi from "joi";
import validator from "../../utils/validator.js";
import EventSetup from "../../models/eventsetupModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            EventTitle: Joi.string().required(),
            EventManager: Joi.string().required(),
            EventDate: Joi.date().required(),
            EventTime: Joi.string().required()
        })
    }),

    handler: async (req, res) => {
        try {
            const { EventTitle, EventManager, EventDate, EventTime } = req.body;
            const existingEvent = await EventSetup.findOne({ where: { EventTitle, EventManager, EventDate, EventTime } });
            if (existingEvent) {
                return responseHandler.error(res, "Event already exists");
            }
            const event = await EventSetup.create({
                EventTitle,
                EventManager,
                EventDate,
                EventTime,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Event scheduled successfully!", event);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
