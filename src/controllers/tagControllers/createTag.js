import Joi from "joi";
import Tag from "../../models/tagModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            color: Joi.string()
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, color } = req.body;

            // Check if tag already exists
            const existingTag = await Tag.findOne({
                where: { name }
            });

            if (existingTag) {
                return responseHandler.error(res, "Tag with this name already exists");
            }

            // Create new tag
            const newTag = await Tag.create({
                name,
                color,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Tag created successfully", newTag);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
