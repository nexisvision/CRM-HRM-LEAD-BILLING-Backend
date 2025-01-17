import Joi from "joi";
import TaskCalendar from "../../models/taskcalendarModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            taskName: Joi.string().required()
                .messages({
                    'string.empty': 'Please provide a task name.'
                }),

            taskDate: Joi.date().required()
                .messages({
                    'date.base': 'Please select a task date.'
                }),
            taskTime: Joi.string().required()
                .messages({
                    'string.empty': 'Please select a task time.'
                }),
            taskDescription: Joi.string().required()
                .messages({
                    'string.empty': 'Please provide a task description.'
                })
        }),
    }),
    handler: async (req, res) => {
        try {
            const { taskName, taskDate, taskTime, taskDescription } = req.body;
            const task = await TaskCalendar.create({ taskName, taskDate, taskTime, taskDescription, created_by: req.user?.username });
            return responseHandler.success(res, "Task created successfully", task);
        } catch (error) {

            return responseHandler.error(res, error);
        }
    }
}

