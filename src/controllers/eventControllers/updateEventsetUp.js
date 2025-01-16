import Joi from "joi";
import validator from "../../utils/validator.js";
import EventSetup from "../../models/eventsetupModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            EventTitle: Joi.string(),
            EventManager: Joi.string(),
            EventDate: Joi.date(),
            EventTime: Joi.string()
        })
    }),
    handler: async (req, res) => {
        const { EventTitle, EventManager, EventDate, EventTime } = req.body;
        try {
            const event = await EventSetup.findByPk(req.params.id);
            if (!event) {
                return responseHandler.error(res, "Event not found");
            }
            await event.update({ EventTitle, EventManager, EventDate, EventTime });
            return responseHandler.success(res, "Event updated successfully", event);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}   
