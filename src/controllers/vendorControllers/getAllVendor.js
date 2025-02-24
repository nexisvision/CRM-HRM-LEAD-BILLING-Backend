import Joi from "joi";
import Vendor from "../../models/vendorModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const vendor = await Vendor.findAll({
                where: {
                    created_by: req.user?.username
                }
            })
            return responseHandler.success(res, "Vendor fetched successfully", vendor)
        } catch (error) {
            return responseHandler.error(res, error.message)
        }
    }
}
