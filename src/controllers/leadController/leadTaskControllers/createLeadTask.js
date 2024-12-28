import Joi from "joi";
import Task from "../../../models/taskModel.js";
import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";
import Deal from "../../../models/dealModel.js";

export default {
    validator: validator({
        params: Joi.object({
            leadId: Joi.string().required().messages({
                'string.empty': 'Lead ID is required',
                'string.base': 'Lead ID must be a string'
            })
        }),
        body: Joi.object({
            taskTitle: Joi.string().required().messages({
                'string.empty': 'Lead Task is required',
                'string.base': 'Lead Task must be a string'
            }),
            taskStatus: Joi.string().required().messages({
                'string.empty': 'Lead Task status is required',
                'string.base': 'Lead Task status must be a string'
            }),
            taskPriority: Joi.string().required().messages({
                'string.empty': 'Lead Task priority is required',
                'string.base': 'Lead Task priority must be a string'
            }),
            taskDescription: Joi.string().required().messages({
                'string.empty': 'Lead Task description is required',
                'string.base': 'Lead Task description must be a string'
            }),
            taskDate: Joi.date().required().messages({
                'date.base': 'Lead Task date must be a date'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { leadId } = req.params;
            const {
                taskTitle,
                taskStatus,
                taskPriority,
                taskDescription,
                taskDate
            } = req.body;

            // Check if lead exists
            const lead = await Lead.findByPk(leadId);
            if (!lead) {
                return responseHandler.notFound(res, "Lead not found");
            }

            const task = await Task.create({
                leadId,
                taskTitle,
                taskStatus,
                taskPriority,
                taskDescription,
                taskDate,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Lead task created successfully", task);
        } catch (error) {
            console.error('Error creating lead task:', error);
            responseHandler.error(res, error.message);
        }
    }
};
