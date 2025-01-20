import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Sources from "../../models/sourcesModel.js";
import Joi from "joi";
import { Op } from "sequelize";
export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            sourceName: Joi.string().required(),
            description: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        const { id } = req.params;
        const { sourceName, description } = req.body;
        try {
            const source = await Sources.findByPk(id);
            if (!source) {
                return responseHandler.notFound(res, "Source not found");
            }
            const existingSource = await Sources.findOne({ where: { sourceName, id: { [Op.not]: id } } });
            if (existingSource) {
                return responseHandler.error(res, "Source already exists");
            }
            await source.update({ sourceName, description, updated_by: req.user.username });
            return responseHandler.success(res, "Source updated successfully", source);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}