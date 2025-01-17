import Joi from "joi";
import SuperAdmin from "../../models/superAdminModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const superAdmin = await SuperAdmin.findByPk(id);
            if (!superAdmin) {
                return responseHandler.error(res, "superAdmin not found");
            }

            await superAdmin.destroy();
            return responseHandler.success(res, "superAdmin deleted successfully", superAdmin);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
