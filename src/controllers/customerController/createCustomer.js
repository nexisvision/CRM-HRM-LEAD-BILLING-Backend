import Joi from "joi";
import Customer from "../../models/customersModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            contact: Joi.string().required(),
            email: Joi.string().email().required(),
            tax_number: Joi.string().allow('', null),
            alternate_number: Joi.string().allow('', null),
            billing_address: Joi.object().allow(null),
            shipping_address: Joi.object().allow(null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, contact, email, tax_number, alternate_number, billing_address, shipping_address } = req.body;

            const customer = await Customer.create({
                related_id: req.user?.id,
                name,
                contact,
                email,
                tax_number,
                alternate_number,
                billing_address,
                shipping_address,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Customer created successfully", customer);

        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}