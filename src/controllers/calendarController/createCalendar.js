import Joi from "joi";
import Calendar from "../../models/calendarModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            color: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, startDate, endDate, color } = req.body;

            const existingCalendar = await Calendar.findOne({ where: { name } });
            if (existingCalendar) {
                return responseHandler.error(res, "Calendar name already exists");
            }

            const calendar = await Calendar.create({
                name,
                startDate,
                endDate,
                color,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Calendar created successfully", calendar);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}

