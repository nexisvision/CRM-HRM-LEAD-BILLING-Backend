import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Setting from "../../models/settingModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const setting = await Setting.findByPk(id);

            if (!setting) {
                return responseHandler.notFound(res, "Setting not found");
            }

                await setting.destroy();

            return responseHandler.success(res, "Setting deleted successfully", setting);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};   