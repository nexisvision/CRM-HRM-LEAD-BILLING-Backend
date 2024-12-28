import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            projectName: Joi.string().required().messages({
                'string.empty': 'Project name is required',
                // 'string.base': 'Project name must be a string',
                // 'any.only': 'Please select a valid project name'
            }),
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
            projectClient: Joi.string().required().messages({
                'string.empty': 'Project client is required',
                'string.base': 'Project client must be a string'
            }),
            taskDescription: Joi.string().required().messages({
                'string.empty': 'Task description is required',
                'string.base': 'Task description must be a string'
            }),
            taskDate: Joi.date().required()
            .messages({
                'date.base': 'Please select a task date.'
            }),
        })
    }),
    handler: async (req, res) => {
        try {
            const { 
                projectName,
                taskTitle,
                taskStatus,
                taskPriority,
                projectClient,
                taskDescription,
                taskDate
            } = req.body;

            const task = await Task.create({
                projectName,
                taskTitle,
                taskStatus,
                taskPriority,
                projectClient,
                taskDescription,
                taskDate,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Task created successfully", task);
        } catch (error) {
            console.error('Error creating task:', error);
            responseHandler.error(res, error.message);
        }
    }
};
