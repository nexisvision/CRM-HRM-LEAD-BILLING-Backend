import Joi from "joi";
import Vendor from "../../models/vendorModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
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
            const { id } = req.params
            const { name, contact, email, taxNumber, address, city, state, country, zipcode } = req.body
            const existingVendor = await Vendor.findOne({ where: { id } });
            if (!existingVendor) {
                return responseHandler.error(res, "Vendor not found");
            }   
            const vendor = await Vendor.update({
                name,
                contact,
                email,
                taxNumber,
                address,
                city,
                state, 
                country,
                zipcode,
                updated_by: req.user?.username
            })
            return responseHandler.success(res, "Vendor created successfully", vendor)
        } catch (error) {
            return responseHandler.error(res, error.message)
        }
    }
}
