import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Invoice from "../../models/invoiceModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Invoice ID must be a string',
                'string.empty': 'Invoice ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const invoice = await Invoice.findByPk(id);

            if (!invoice) {
                return responseHandler.notFound(res, "Invoice not found");
            }

            responseHandler.success(res, "Invoice fetched successfully", invoice);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};   