import Joi from "joi";
import Tag from "../../models/tagModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            // Find existing tag
            const tag = await Tag.findByPk(id);
            if (!tag) {
                return responseHandler.notFound(res, "Tag not found");
            }

            // Delete tag
            await tag.destroy();

            responseHandler.success(res, "Tag deleted successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
