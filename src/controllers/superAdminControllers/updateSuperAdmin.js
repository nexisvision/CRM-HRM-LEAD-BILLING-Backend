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
            username: Joi.string().min(3).max(30),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            phone: Joi.string().optional(),
            profilePic: Joi.string().optional()
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
            responseHandler.success(res, "Super admin updated successfully", superAdmin);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};