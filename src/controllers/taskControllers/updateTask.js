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
            taskName: Joi.string().required(),
            category: Joi.string().required(),
            project: Joi.string().required(),
            startDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            assignTo: Joi.object().required(),
            priority: Joi.string().required(),
            status: Joi.string().required(),
            description: Joi.string().optional().allow('', null)

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