import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const SubClientRoleID = await Role.findOne({
                where: {
                    role_name: "sub-client"
                }
            });
            const subClients = await User.findAll({
                where: {
                    role_id: SubClientRoleID.id
                }
            });
            responseHandler.success(res, "SubClients fetched successfully", subClients);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}