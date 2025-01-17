import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const tasks = await Task.findAll({ where: { related_id: id } });
            return responseHandler.success(res, "Tasks fetched successfully", tasks);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
