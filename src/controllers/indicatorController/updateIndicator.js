import Joi from "joi";
import Indicator from "../../models/IndicatorModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            branch: Joi.string().optional(),
            department: Joi.string().optional(),
            designation: Joi.string().optional(),
            overall_rating: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { branch, department, designation, overall_rating } = req.body;
            const indicator = await Indicator.findByPk(id);
            if (!indicator) {
                return responseHandler.error(res, "Indicator not found");
            }
            await indicator.update({ branch, department, designation, overall_rating });
            return responseHandler.success(res, "Indicator updated successfully", indicator);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}