import Joi from "joi";
import Stage from "../../models/stageModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            stageType: Joi.string().valid('lead', 'deal', 'lable').required(),
            stageName: Joi.string().required(),
            pipeline: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { stageType, stageName, pipeline } = req.body;
            const existingStage = await Stage.findOne({ where: { stageName, pipeline } });
            if (existingStage) {
                return responseHandler.error(res, "Stage already exists");
            }
            const stage = await Stage.create({ stageType, stageName, pipeline,
                client_id: req.des?.client_id,
                created_by: req.user.username });
            return responseHandler.success(res, "Stage created successfully", stage);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
