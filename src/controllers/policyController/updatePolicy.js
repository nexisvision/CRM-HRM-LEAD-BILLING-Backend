import Joi from "joi";
import Policy from "../../models/policyModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            branch: Joi.string().optional(),
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            files: Joi.array().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { branch, title, description, files } = req.body;
            const policy = await Policy.findByPk(id);
            if (!policy) {
                return responseHandler.error(res, "Policy not found");
            }
            const existingPolicy = await Policy.findOne({ where: { title, id: { [Op.not]: id } } });
            if (existingPolicy) {
                return responseHandler.error(res, "Policy with this title already exists");
            }
            await policy.update({ branch, title, description, files, updated_by: req.user?.username });
            return responseHandler.success(res, "Policy updated successfully", policy);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}

