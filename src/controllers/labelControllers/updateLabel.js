import Joi from "joi";
import Tag from "../../models/labelModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().allow('', null),
            color: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, color } = req.body;

            // Find existing tag
            const tag = await Tag.findByPk(id);
            if (!tag) {
                return responseHandler.notFound(res, "Tag not found");
            }

            // Check if new tag name already exists (if being updated)
            if (name && name !== tag.name) {
                const existingTag = await Tag.findOne({
                    where: { name }
                });

                if (existingTag) {
                    return responseHandler.error(res, "Tag with this name already exists");
                }
            }

            // Update tag
            const updatedTag = await tag.update({
                name,
                color,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Tag updated successfully", updatedTag);
        } catch (error) {

            return responseHandler.error(res, error.message);
        }
    }
};
