import Joi from "joi";
import Tag from "../../models/labelModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import User from "../../models/userModel.js";
import { seedDefaultLabels } from "./createLabel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number(),
            limit: Joi.number()
        })
    }),
    handler: async (req, res) => {
        try {
            const userRole = req.user.role;
            const { id } = req.params;
            let tags;

            // Find role in role model
            const role = await Role.findOne({
                where: { id: userRole }
            });

            if (!role) {
                return responseHandler.error(res, "Role not found");
            }

            const client_id = role.role_name === 'client' ? req.user.id : req.user.client_id;

            // Check if tags exist, if not create defaults
            const existingTags = await Tag.findAll({
                where: {
                    related_id: id,
                    client_id
                }
            });

            if (existingTags.length === 0) {
                // Seed default labels
                tags = await seedDefaultLabels(id, client_id, req.user.username);
            } else {
                tags = existingTags;
            }

            return responseHandler.success(res, "Tags retrieved successfully", tags);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};

