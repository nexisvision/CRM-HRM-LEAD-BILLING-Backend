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
            name: Joi.string().required(),
            color: Joi.string().allow('', null),
            lableType: Joi.string().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, color, lableType } = req.body;

            const existingTag = await Tag.findOne({
                where: { related_id: id, name, lableType }
            });
            if (existingTag) {
                return responseHandler.error(res, "Tag with this name already exists");
            }

            const newTag = await Tag.create({
                related_id: id,
                name,
                color,
                lableType,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Tag created successfully", newTag);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};