import Setting from "../../models/settingModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
         
            const settings = await Setting.findAll();
            return responseHandler.success(res, "Setting fetched successfully", settings);
        }
        catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}