import Joi from "joi";
import Bill from "../../models/billModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            vendor: Joi.string().required(),
            billDate: Joi.date().required(),
            discription: Joi.string().required(),
            subtotal: Joi.number().required(),
            status: Joi.string().required().default('pending'),
            discount: Joi.number().optional(),
            tax: Joi.number().optional(),
            items: Joi.array().required(),
            total: Joi.number().required(),
            note: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { vendor, billDate, discription, subtotal, status, discount, tax, items, total, note } = req.body;

            // Determine bill_status based on total and updated total amounts
            const newBill = await Bill.create({ 
                related_id: id,
                vendor,
                billDate,
                discription,
                subtotal,
                status,
                discount,
                tax, 
                items,
                total,
                note,
                bill_status: 'draft',
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Bill created successfully", newBill);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
