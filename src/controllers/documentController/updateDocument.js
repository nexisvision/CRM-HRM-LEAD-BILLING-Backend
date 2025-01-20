import Joi from "joi";
import Document from "../../models/documentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            role: Joi.string().optional(),
            description: Joi.string().optional().allow('', null),
            files: Joi.object().optional().allow(null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, role, description, files } = req.body;
            const document = await Document.findByPk(id);
            if (!document) {
                return responseHandler.error(res, "Document not found");
            }
            const existingDocument = await Document.findOne({ where: { name, id: { [Op.not]: id } } });
            if (existingDocument) {
                return responseHandler.error(res, "Document with this name already exists");
            }
            await document.update({ name, role, description, files, updated_by: req.user?.username });
            return responseHandler.success(res, "Document updated successfully", document);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}