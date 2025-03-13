import Joi from "joi";
import Product from "../../models/productModel.js";
import Activity from "../../models/activityModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";
import { s3 } from "../../config/config.js";
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
            const image = req.file;
            const { id } = req.params;
            const { name, category, price, sku, tax, hsn_sac, description } = req.body;
            const product = await Product.findByPk(id);
            if (!product) {
                return responseHandler.error(res, "Product not found");
            }
            const existingProduct = await Product.findOne({ where: { name, id: { [Op.not]: id } } });
            if (existingProduct) {
                return responseHandler.error(res, "Product already exists");
            }
            let imageUrl = product.image;
            if (image) {
                if (product.image) {
                    // Get everything after the bucket URL
                    const key = product.image.split('.amazonaws.com/').pop();
                
                    const s3Params = {
                        Bucket: s3.config.bucketName,
                        Key: key,
                    };
                    try {
                        await s3.deleteObject(s3Params).promise();
                    
                    } catch (error) {
                        console.error('Error deleting old product image:', error);
                    }
                }
                imageUrl = await uploadToS3(image, req.user?.roleName, "products", req.user?.username);
            }
            await product.update({ name, category, price, sku, tax, hsn_sac, description, image: imageUrl, updated_by: req.user?.username });
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
            return responseHandler.error(res, error?.message);
        }
    }
}