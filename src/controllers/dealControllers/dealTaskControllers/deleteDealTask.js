import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";
import Task from "../../../models/taskModel.js";
import Joi from "joi";
export default {
    validator: validator({
        params: Joi.object({
            dealId: Joi.string().required().messages({
                'string.base': 'Deal ID must be a string',
                'string.empty': 'Deal ID is required'
            }),
            taskId: Joi.string().required().messages({
                'string.base': 'Task ID must be a string',
                'string.empty': 'Task ID is required'
            })
        })
    }),
    handler: async (req, res) => {
        const { dealId, taskId } = req.params;
        try {
            const dealTask = await Task.findOne({
                where: {
                    id: taskId,
                    dealId: dealId
                }
            });

            if (!dealTask) {
                return responseHandler.notFound(res, "Deal task not found");
            }

            await dealTask.destroy();
            responseHandler.success(res, "Deal task deleted successfully");
        } catch (error) {
            console.error('Error deleting deal task:', error);
            responseHandler.error(res, error.message);
        }
    }
}