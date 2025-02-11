import Joi from "joi";
import Document from "../../models/documentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import uploadToS3 from "../../utils/uploadToS3.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            role: Joi.string().required(),
            description: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const file = req.file;
            const { name, role, description } = req.body;
            const existingDocument = await Document.findOne({ where: { name } });
            if (existingDocument) {
                return responseHandler.error(res, "Document with this name already exists");
            }

            const uploadedFile = await uploadToS3(file, req.user?.roleName, "documents", req.user?.username);
            const newDocument = await Document.create({ name, role, description, file: uploadedFile, created_by: req.user?.username });
            return responseHandler.success(res, "Document created successfully", newDocument);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
