import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Sources from "../../models/sourcesModel.js";
import Joi from "joi";
export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            sourceName: Joi.string().required(),
            description: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        const { id } = req.params;
        const { sourceName, description } = req.body;
        try {
            await Sources.update({ sourceName, description, updated_by: req.user.username }, { where: { id } });
            responseHandler.success(res, 200, "Source updated successfully");
        } catch (error) {
            responseHandler.error(res, 500, "Internal server error");
        }
    }
}