import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().default(1).optional(),
            limit: Joi.number().default(10).optional()
        })
    }),
    handler: async (req, res) => {
        try {
            // const { page, limit } = req.query;
            // const offset = (page - 1) * limit;
            const deals = await Deal.findAll();
            responseHandler.success(res, "Deals fetched successfully", deals);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}