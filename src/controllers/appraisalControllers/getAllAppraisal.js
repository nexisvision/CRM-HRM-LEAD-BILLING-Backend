import Joi from "joi";
import Appraisal from "../../models/AppraisalModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const appraisals = await Appraisal.findAll();
            if (!appraisals) {
                return responseHandler.error(res, "Appraisals not found");
            }
            return responseHandler.success(res, "Appraisals fetched successfully", appraisals);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}