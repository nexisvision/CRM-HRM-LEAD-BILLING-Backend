import Joi from "joi";
import validator from "../../utils/validator.js";
import Inquiry from "../../models/inquiryModel.js";
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
            const inquiries = await Inquiry.findAll();
            if (!inquiries) {
                responseHandler.error(res, "No inquiries found");
            }
            responseHandler.success(res, "Inquiry fetched successfully", inquiries);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}