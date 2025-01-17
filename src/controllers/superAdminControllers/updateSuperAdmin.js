import Joi from "joi";
import SuperAdmin from "../../models/superAdminModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            username: Joi.string().min(3).max(30).allow('', null),
            firstName: Joi.string().optional().allow('', null),
            lastName: Joi.string().optional().allow('', null),
            phone: Joi.string().optional().allow('', null),
            profilePic: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, firstName, lastName, phone, profilePic } = req.body;

            const superAdmin = await SuperAdmin.findByPk(id);
            if (!superAdmin) {
                return responseHandler.notFound(res, "Super admin not found");
            }

            await superAdmin.update({ username, firstName, lastName, phone, profilePic, updated_by: req.user?.username });
            return responseHandler.success(res, "Super admin updated successfully", superAdmin);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};