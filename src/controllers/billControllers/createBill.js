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
            discription: Joi.object().required(),
            status: Joi.string().required().default('pending'),
            discount: Joi.number().optional(),
            tax: Joi.number().optional(),
            total: Joi.number().required(),
            note: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { vendor, billDate, discription, status, discount, tax, total, note } = req.body;

            // Determine bill_status based on total and updated total amounts
          

            const newBill = await Bill.create({ 
                related_id: id,
                vendor,
                billDate,
                discription,
                status,
                discount,
                tax, 
                total,
                note,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Bill created successfully", newBill);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
