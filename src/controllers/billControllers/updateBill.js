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
            items: Joi.array().required(),
            discount: Joi.number().optional(),
            tax: Joi.number().optional(),
            total: Joi.number().required(),
            note: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { vendor, billDate, discription, subtotal, status, discount, tax, total, note, items } = req.body;

            const newBill = await Bill.findByPk(id);
            if (!newBill) {
                return responseHandler.error(res, "Bill not found");
            }
            await newBill.update({ vendor, billDate, discription, subtotal, status, discount, tax, total, note, items, updated_by: req.user?.username });
            return responseHandler.success(res, "Bill updated successfully", newBill);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
