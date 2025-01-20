import Joi from "joi";
import Calendar from "../../models/calendarModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const calendars = await Calendar.findAll();
            if (!calendars) {
                return responseHandler.error(res, "No calendars found");
            }
            return responseHandler.success(res, "Calendars fetched successfully", calendars);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}

