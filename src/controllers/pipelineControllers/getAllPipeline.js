import Joi from "joi";
import Pipeline from "../../models/pipelineModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const pipelines = await Pipeline.findAll();
            responseHandler.success(res, 'Pipelines fetched successfully', pipelines);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}