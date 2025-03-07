import Joi from "joi";
import Product from "../../models/productModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Activity from "../../models/activityModel.js";
import uploadToS3 from "../../utils/uploadToS3.js";


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
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, category, price, sku, tax, hsn_sac, description } = req.body;
            const image = req.file;
            const imageUrl = await uploadToS3(image, req.user?.roleName, "products", req.user?.username);
            const product = await Product.create({
                related_id: req.params.id,
                name,
                category,
                price,
                sku,
                tax,
                hsn_sac,
                description,
                image: imageUrl,
                client_id: req.des?.client_id,
                created_by: req.user?.username,
            });
            await Activity.create({
                related_id: req.params.id,
                activity_from: "product",
                activity_id: product.id,
                action: "created",
                performed_by: req.user?.username,
                client_id: req.des?.client_id,
                activity_message: `Product ${product.name} created successfully`
            });
            return responseHandler.success(res, "Product created successfully", product);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
