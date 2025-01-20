import Joi from "joi";
import Document from "../../models/documentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            role: Joi.string().required(),
            description: Joi.string().optional().allow('', null),
            files: Joi.array().optional().allow(null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, role, description, files } = req.body;
            const existingDocument = await Document.findOne({ where: { name } });
            if (existingDocument) {
                return responseHandler.error(res, "Document with this name already exists");
            }
            const newDocument = await Document.create({ name, role, description, files, created_by: req.user?.username });
            return responseHandler.success(res, "Document created successfully", newDocument);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
