import Joi from "joi";
import Product from "../../models/productModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Activity from "../../models/activityModel.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            name: Joi.string().required(),
            category: Joi.string().required(),
            price: Joi.number().required(),
            sku: Joi.string().optional().allow('', null),
            tax: Joi.string().optional().allow('', null),
            hsn_sac: Joi.string().optional().allow('', null),
            description: Joi.string().optional().allow('', null),
            files: Joi.array().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, category, price, sku, tax, hsn_sac, description, files } = req.body;
            const product = await Product.create({
                related_id: req.params.id,
                name,
                category,
                price,
                sku,
                tax,
                hsn_sac,
                description,
                files,
                created_by: req.user?.username,
            });
            await Activity.create({
                related_id: req.params.id,
                activity_from: "product",
                activity_id: product.id,
                action: "created",
                performed_by: req.user?.username,
                activity_message: `Product ${product.name} created successfully`
            });
            return responseHandler.success(res, "Product created successfully", product);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}
