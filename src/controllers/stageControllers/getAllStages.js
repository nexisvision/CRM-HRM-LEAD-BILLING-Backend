import Joi from "joi";
import Stage from "../../models/stageModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const stages = await Stage.findAll();
            if (!stages) {
                responseHandler.notFound(res, "Stages not found");
            }
            responseHandler.success(res, "Stages fetched successfully", stages);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
