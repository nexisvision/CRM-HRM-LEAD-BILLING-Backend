import Joi from "joi";
import TaskCalendar from "../../models/taskcalendarModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            taskName: Joi.string().required(),
            taskDate: Joi.date().required(),
            taskTime: Joi.string().required(),
            taskDescription: Joi.string().required()
        }),
    }),
    handler: async (req, res) => {
        try {
            const { taskName, taskDate, taskTime, taskDescription } = req.body;
            const existingTask = await TaskCalendar.findOne({ where: { taskName, taskDate, taskTime, taskDescription } });
            if (existingTask) {
                return responseHandler.error(res, "Task already exists");
            }
            const task = await TaskCalendar.create({ taskName, taskDate, taskTime, taskDescription, 
                client_id: req.des?.client_id,
                created_by: req.user?.username });
            return responseHandler.success(res, "Task created successfully", task);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
}

