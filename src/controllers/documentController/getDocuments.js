import Joi from "joi";
import Document from "../../models/documentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const documents = await Document.findAll();
            if (!documents) {
                return responseHandler.error(res, "No documents found");
            }
            return responseHandler.success(res, "Documents fetched successfully", documents);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}