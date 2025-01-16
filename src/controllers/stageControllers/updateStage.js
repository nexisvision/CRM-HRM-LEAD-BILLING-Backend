import Joi from "joi";
import Stage from "../../models/stageModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            stageName: Joi.string().required(),
            pipeline: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { stageName, pipeline } = req.body;
            const stage = await Stage.findByPk(id)
            if (!stage) {
                responseHandler.notFound(res, "Stage not found");
            }
            await stage.update({ stageName, pipeline, updated_by: req.user.id });
            responseHandler.success(res, "Stage updated successfully", stage);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
