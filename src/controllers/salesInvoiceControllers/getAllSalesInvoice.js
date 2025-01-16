import Joi from "joi";
import validator from "../../utils/validator.js";
import SalesInvoice from "../../models/salesInvoiceModel.js";
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
            const salesInvoice = await SalesInvoice.findAll({ where: { related_id: id } });
            responseHandler.success(res, "salesInvoice fetched successfully", salesInvoice);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}