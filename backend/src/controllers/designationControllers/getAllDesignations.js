import Joi from "joi";
import Designation from "../../models/designationModel.js";
import responseHandler from "../../utils/responseHandler.js";
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
            const designations = await Designation.findAll();
            responseHandler.success(res, "Designations fetched successfully", designations);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }

}