import Product from "../../models/productModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
       params: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
       }),
    }),
    handler: async (req, res) => {
        try {
                // const { page, limit } = req.params;
            const products = await Product.findAll({
               
            });
            return responseHandler.success(res, "Products fetched successfully", products);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}