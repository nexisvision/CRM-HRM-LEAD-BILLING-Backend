import Joi from "joi";
import Product from "../../models/productModel.js";
import Activity from "../../models/activityModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            name: Joi.string().required(),
            category: Joi.string().required(),
            price: Joi.string().required(),
            sku: Joi.string().optional().allow('', null),
            tax: Joi.string().optional().allow('', null),
            hsn_sac: Joi.string().optional().allow('', null),
            description: Joi.string().optional().allow('', null),
            files: Joi.array().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, category, price, sku, tax, hsn_sac, description, files } = req.body;
            const product = await Product.findByPk(id);
            if (!product) {
                return responseHandler.error(res, "Product not found");
            }
            await product.update({ name, category, price, sku, tax, hsn_sac, description, files, updated_by: req.user?.username });
            await Activity.create({
                related_id: product.related_id,
                activity_from: "product",
                activity_id: product.id,
                action: "updated",
                performed_by: req.user?.username,
                activity_message: `Product ${product.name} updated successfully`
            });
            return responseHandler.success(res, "Product updated successfully", product);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}