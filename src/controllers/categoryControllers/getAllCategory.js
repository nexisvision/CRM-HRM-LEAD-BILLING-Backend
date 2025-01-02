import Category from "../../models/categoryModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";
export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().default(1).optional(),
            limit: Joi.number().default(10).optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const categories = await Category.findAll({ where: { related_id: id } });
            responseHandler.success(res, "Categories fetched successfully", categories);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}