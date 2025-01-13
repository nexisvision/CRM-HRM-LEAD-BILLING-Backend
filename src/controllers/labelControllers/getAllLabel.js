import Joi from "joi";
import Tag from "../../models/labelModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number(),
            limit: Joi.number()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const tags = await Tag.findAll({ where: { related_id: id } });

            responseHandler.success(res, "Tags retrieved successfully", tags);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
};

