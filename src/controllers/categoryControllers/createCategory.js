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
            name: Joi.string().required(),
            color: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, color } = req.body;

            // Create new category
            const newCategory = await Category.create({
                related_id: id,
                name,
                color,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Category created successfully", newCategory);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
