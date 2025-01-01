import Joi from "joi";
import Category from "../../models/categoryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            color: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, color } = req.body;
            const category = await Category.findByPk(id);
            if (!category) {
                return responseHandler.error(res, "Category not found");
            }
            await category.update({ name, color });
            responseHandler.success(res, "Category updated successfully", category);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}   