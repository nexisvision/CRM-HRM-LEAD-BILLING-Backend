import Product from "../../models/productModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const products = await Product.findAll({ where: { related_id: id } });
            return responseHandler.success(res, "Products fetched successfully", products);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}