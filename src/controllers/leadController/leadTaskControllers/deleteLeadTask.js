import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";
import Task from "../../../models/taskModel.js";
import Joi from "joi";
export default {
    validator: validator({
        params: Joi.object({
            leadId: Joi.string().required().messages({
                'string.base': 'Lead ID must be a string',
                'string.empty': 'Lead ID is required'
            }),
            taskId: Joi.string().required().messages({
                'string.base': 'Task ID must be a string',
                'string.empty': 'Task ID is required'
            })
        })
    }),
    handler: async (req, res) => {
        const { leadId, taskId } = req.params;
        try {
            const leadTask = await Task.findOne({
                where: {
                    id: taskId,
                    leadId: leadId
                }
            });

            if (!leadTask) {
                return responseHandler.notFound(res, "Lead task not found");
            }

            await leadTask.destroy();
            responseHandler.success(res, "Lead task deleted successfully");
        } catch (error) {
            console.error('Error deleting lead task:', error);
            responseHandler.error(res, error.message);
        }
    }
}