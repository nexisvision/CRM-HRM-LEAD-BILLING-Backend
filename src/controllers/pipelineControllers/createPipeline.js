import Joi from "joi";
import Pipeline from "../../models/pipelineModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            pipeline_name: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { pipeline_name } = req.body;
            const existingPipeline = await Pipeline.findOne({ where: { pipeline_name } });
            if (existingPipeline) {
                return responseHandler.error(res, "Pipeline already exists");
            }
            const pipeline = await Pipeline.create({ pipeline_name, created_by: req.user?.username });
            return responseHandler.success(res, "Pipeline created successfully", pipeline);
        } catch (error) {
            return responseHandler(res, error.message, 500);
        }
    }
}