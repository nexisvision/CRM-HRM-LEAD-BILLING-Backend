import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.empty': 'Task id is required',
                'string.base': 'Task id must be a string'
            })
        }),
        body: Joi.object({
            taskTitle: Joi.string().required().messages({
                'string.empty': 'Task title is required',
                'string.base': 'Task title must be a string'
            }),
            taskStatus: Joi.string().required().messages({
                'string.empty': 'Task status is required',
                'string.base': 'Task status must be a string'
            }),
            taskPriority: Joi.string().required().messages({
                'string.empty': 'Task priority is required',
                'string.base': 'Task priority must be a string'
            }),
            // projectEmployee: Joi.string().required().messages({
            //     'string.empty': 'Project employee is required',
            //     'string.base': 'Project employee must be a string'
            // }),
            projectClient: Joi.string().optional().messages({
                'string.empty': 'Project client is required',
                'string.base': 'Project client must be a string'
            }),
            projectName: Joi.string().required().messages({
                'string.empty': 'Project name is required',
                'string.base': 'Project name must be a string'
            }),
            taskDescription: Joi.string().required().messages({
                'string.empty': 'Task description is required',
                'string.base': 'Task description must be a string'
            }),
            taskDate: Joi.date().required().messages({
                'date.base': 'Task date must be a date'
            }),


        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                taskName,
                category,
                project,
                startDate,
                dueDate,
                assignTo,
                priority,
                status,
                description
            } = req.body;
            const task = await Task.findByPk(id);
            if (!task) {
                return responseHandler.error(res, 'Task not found', 404);
            }
            const updatedTask = await task.update({
                taskName,
                category,
                project,
                startDate,
                dueDate,
                assignTo,
                priority,
                status,
                description,
                updated_by: req.user?.username
            });
            responseHandler.success(res, 'Task updated successfully', updatedTask);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}