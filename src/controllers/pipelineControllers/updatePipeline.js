import Joi from "joi";
import Pipeline from "../../models/pipelineModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";

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
                return responseHandler.notFound(res, "Pipeline not found");
            }
            const existingPipeline = await Pipeline.findOne({ where: { pipeline_name, id: { [Op.not]: id } } });
            if (existingPipeline) {
                return responseHandler.error(res, "Pipeline already exists");
            }
            const updatedPipeline = await pipeline.update({ pipeline_name, updated_by: req.user?.username });
            return responseHandler.success(res, "Pipeline updated successfully", updatedPipeline);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}