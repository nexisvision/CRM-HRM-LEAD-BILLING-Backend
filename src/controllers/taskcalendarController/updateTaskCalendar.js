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
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Task ID must be a string',
                'string.empty': 'Task ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { taskName, taskDate, taskTime, taskDescription } = req.body;
            const task = await TaskCalendar.findByPk(id);
            if (!task) {
            return responseHandler.error(res, "Task not found");
        }
        await task.update({ taskName, taskDate, taskTime, taskDescription, updated_by: req.user?.username });
            responseHandler.success(res, "Task updated successfully", task);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}