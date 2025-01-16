import Joi from "joi";
import Pipeline from "../../models/pipelineModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            pipeline_name: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { pipeline_name } = req.body;

            const pipeline = await Pipeline.findByPk(id);
            if (!pipeline) {
                responseHandler.notFound(res, "Pipeline not found");
            }

            // Check if new tag name already exists (if being updated)
            if (pipeline_name && pipeline_name !== pipeline.pipeline_name) {
                const existingPipeline = await Pipeline.findOne({
                    where: { pipeline_name }
                });

                if (existingPipeline) {
                    responseHandler.error(res, "Pipeline with this name already exists");
                }
            }
            const updatedPipeline = await pipeline.update({ pipeline_name, updated_by: req.user?.username });
            responseHandler.success(res, "Pipeline updated successfully", updatedPipeline);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}