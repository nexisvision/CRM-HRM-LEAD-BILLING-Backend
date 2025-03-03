import Joi from "joi";
import Vendor from "../../models/vendorModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            contact: Joi.string().required(),
            email: Joi.string().email().required(),
            taxNumber: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(), 
            state: Joi.string().required(),
            country: Joi.string().required(),
            zipcode: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, contact, email, taxNumber, address, city, state, country, zipcode } = req.body
            const existingVendor = await Vendor.findOne({ where: { email } });
            if (existingVendor) {
                return responseHandler.error(res, "Vendor already exists");
            }
            const vendor = await Vendor.create({
                name,
                contact,
                email,
                taxNumber,
                address,
                city,
                state, 
                country,
                zipcode,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            })
            return responseHandler.success(res, "Vendor created successfully", vendor)
        } catch (error) {
            return responseHandler.error(res, error.message)
        }
    }
}
