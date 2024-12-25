import EventSetup from "../../models/eventsetupModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            EventTitle: Joi.string().required()
                .messages({
                    'string.empty': 'Please provide a title for the event.'
                }),
            EventManager: Joi.string().required()
                .messages({
                    'string.empty': 'Please select an EventManager.'
                }),
            EventDate: Joi.date().required()
                .messages({
                    'date.base': 'Please select an event date.'
                }),
            EventTime: Joi.string().required()
                .messages({
                    'string.empty': 'Please select an event time.'
                })
        })
    }),

    handler: async (req, res) => {
        const { EventTitle, EventManager, EventDate, EventTime } = req.body;
        try {
            const event = await EventSetup.create({ 
                EventTitle,
                EventManager,
                EventDate,
                EventTime    
            });
            responseHandler.success(res, "Event scheduled successfully!", event);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
