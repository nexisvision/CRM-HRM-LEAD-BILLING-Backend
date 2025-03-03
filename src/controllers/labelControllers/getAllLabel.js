import Joi from "joi";
import Tag from "../../models/labelModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import User from "../../models/userModel.js";

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

            if (role.role_name === 'client') {
                // If user is client, find tags matching their client_id
                tags = await Tag.findAll({
                    where: {
                        related_id: id,
                        client_id: req.user.id
                    }
                });
            } else {
                // For other roles, get client_id from user model
                const user = await User.findOne({
                    where: { id: req.user.id }
                });

                if (!user) {
                    return responseHandler.error(res, "User not found");
                }

                tags = await Tag.findAll({
                    where: {
                        related_id: id,
                        client_id: user.client_id
                    }
                });
            }

            return responseHandler.success(res, "Tags retrieved successfully", tags);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};

