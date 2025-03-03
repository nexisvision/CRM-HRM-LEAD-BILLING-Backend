import Joi from "joi";
import validator from "../../utils/validator.js";
import Activity from "../../models/activityModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Role from "../../models/roleModel.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const userRole = req.user.role;

            // Find role in role model
            const role = await Role.findOne({
                where: { id: userRole }
            });

            if (!role) {
                return responseHandler.error(res, "Role not found");
            }

            let activities;
            if (role.role_name === 'client') {
                // If user is client, find activities matching their id
                activities = await Activity.findAll({
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

                activities = await Activity.findAll({
                    where: {
                        related_id: id,
                        client_id: user.client_id
                    }
                });
            }

            if (!activities || activities.length === 0) {
                return responseHandler.error(res, "Activities Not Found");
            }

            return responseHandler.success(res, "Activities fetched successfully", activities);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
