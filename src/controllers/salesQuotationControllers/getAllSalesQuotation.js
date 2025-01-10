import Joi from "joi";
import validator from "../../utils/validator.js";
import SalesQuotations from "../../models/salesQuotationModel.js";
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
            const salesQuotations = await SalesQuotations.findAll({ where: { related_id: id } });
            return responseHandler.success(res, "salesQuotations fetched successfully", salesQuotations);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}