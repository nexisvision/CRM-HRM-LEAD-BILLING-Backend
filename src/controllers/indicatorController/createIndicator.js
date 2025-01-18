import Joi from "joi";
import Indicator from "../../models/IndicatorModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            branch: Joi.string().required(),
            department: Joi.string().required(),
            designation: Joi.string().required(),
            overall_rating: Joi.number().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { branch, department, designation, overall_rating } = req.body;
            const indicator = await Indicator.create({ branch, department, designation, overall_rating });
            responseHandler.success(res, "Indicator created successfully", indicator);
        } catch (error) {
            responseHandler.error(res, error?.message);
        }
    }
}