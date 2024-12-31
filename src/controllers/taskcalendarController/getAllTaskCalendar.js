import TaskCalendar from "../../models/taskcalendarModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const tasks = await TaskCalendar.findAll();
            responseHandler.success(res, "Tasks fetched successfully", tasks);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}