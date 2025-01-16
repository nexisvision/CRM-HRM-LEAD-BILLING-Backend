import responseHandler from "../../../utils/responseHandler.js";
import Task from "../../../models/taskModel.js";
import Joi from "joi";
import validator from "../../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            leadId: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { leadId } = req.params;
            const tasks = await Task.findAll({ where: { leadId } });
            responseHandler.success(res, "Lead tasks fetched successfully", tasks);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}