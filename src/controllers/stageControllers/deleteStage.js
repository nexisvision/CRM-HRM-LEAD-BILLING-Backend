import Joi from "joi";
import Stage from "../../models/stageModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const stage = await Stage.findByPk(id);
            if (!stage) {
                responseHandler.notFound(res, "Stage not found");
            }
            await stage.destroy();
            responseHandler.success(res, "Stage deleted successfully", stage);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
