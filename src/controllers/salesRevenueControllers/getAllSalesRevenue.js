import Joi from "joi";
import validator from "../../utils/validator.js";
import SalesRevenue from "../../models/salesRevenueModel.js";
import responseHandler from "../../utils/responseHandler.js";


export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.user;
            const salesRevenue = await SalesRevenue.findAll({ where: { related_id: id } });
            return responseHandler.success(res, "salesRevenue fetched successfully", salesRevenue);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}