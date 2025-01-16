import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Sources from "../../models/sourcesModel.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            await Sources.destroy({ where: { id } });
            responseHandler.success(res, 200, "Source deleted successfully");
        } catch (error) {
            responseHandler.error(res, 500, "Internal server error");
        }
    }
}