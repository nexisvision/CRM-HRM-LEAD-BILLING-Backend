import Joi from "joi";
import Task from "../../../models/taskModel.js";
import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";
import Deal from "../../../models/dealModel.js";

export default {
    validator: validator({
        params: Joi.object({
            dealId: Joi.string().required().messages({
                'string.empty': 'Deal ID is required',
                'string.base': 'Deal ID must be a string'
            })
        }),
        body: Joi.object({
            taskTitle: Joi.string().required().messages({
                'string.empty': 'Deal Task is required',
                'string.base': 'Deal Task must be a string'
            }),
            taskStatus: Joi.string().required().messages({
                'string.empty': 'Deal Task status is required',
                'string.base': 'Deal Task status must be a string'
            }),
            taskPriority: Joi.string().required().messages({
                'string.empty': 'Deal Task priority is required',
                'string.base': 'Deal Task priority must be a string'
            }),
            taskDescription: Joi.string().required().messages({
                'string.empty': 'Deal Task description is required',
                'string.base': 'Deal Task description must be a string'
            }),
            taskDate: Joi.date().required().messages({
                'date.base': 'Deal Task date must be a date'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { dealId } = req.params;
            const {
                taskTitle,
                taskStatus,
                taskPriority,
                taskDescription,
                taskDate
            } = req.body;

            // Check if deal exists
            const deal = await Deal.findByPk(dealId);
            if (!deal) {
                return responseHandler.notFound(res, "Deal not found");
            }

            const task = await Task.create({
                dealId,
                taskTitle,
                taskStatus,
                taskPriority,
                taskDescription,
                taskDate,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Deal task created successfully", task);
        } catch (error) {
            console.error('Error creating deal task:', error);
            responseHandler.error(res, error.message);
        }
    }
};
