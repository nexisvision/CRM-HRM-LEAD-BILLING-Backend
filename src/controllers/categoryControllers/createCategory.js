import Joi from "joi";
import Category from "../../models/categoryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            color: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, color } = req.body;

            // Check if category already exists
            const existingCategory = await Category.findOne({
                where: { name }
            });

            if (existingCategory) {
                return responseHandler.error(res, "Category with this name already exists");
            }

            // Create new category
            const newCategory = await Category.create({
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
