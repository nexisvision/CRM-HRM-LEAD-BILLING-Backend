import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Invoice from "../../models/invoiceModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const invoice = await Invoice.findByPk(id);

            if (!invoice) {
                responseHandler.notFound(res, "Invoice not found");
            }

            await invoice.destroy();

            responseHandler.success(res, "Invoice deleted successfully", invoice);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
};   