import Joi from "joi";
import DocumentType from "../../models/documentTypeModel.js";
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
            const documentsTypes = await DocumentType.findAll();
            if (!documentsTypes) {
                return responseHandler.error(res, "Documents types not found");
            }
            return responseHandler.success(res, "Documents types fetched successfully", documentsTypes);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}