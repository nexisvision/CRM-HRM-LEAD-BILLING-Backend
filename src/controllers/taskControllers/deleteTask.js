import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.empty': 'Task ID is required',
                'string.base': 'Task ID must be a string'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);
            if (!task) {
                return responseHandler.error(res, "Task not found");
            }
            await task.destroy();
            responseHandler.success(res, "Task deleted successfully", task);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}