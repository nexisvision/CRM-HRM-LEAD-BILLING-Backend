import Joi from "joi";
import Product from "../../models/productModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Activity from "../../models/activityModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                return responseHandler.error(res, "Product not found");
            }
            await product.destroy();
            await Activity.create({
                related_id: product.related_id,
                activity_from: "product",
                activity_id: product.id,
                action: "deleted",
                performed_by: req.user?.username,
                activity_message: `Product ${product.name} deleted successfully`
            });
            return responseHandler.success(res, "Product deleted successfully", product);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}