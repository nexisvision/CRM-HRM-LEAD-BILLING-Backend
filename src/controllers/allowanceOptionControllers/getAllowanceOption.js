import Joi from "joi";
import validator from "../../utils/validator.js";
import AllowanceOption from "../../models/allowanceOptionModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const allowanceOption = await AllowanceOption.findByPk(id);
            if (!allowanceOption) {
                return responseHandler.error(res, "Allowance option not found");
            }
            return responseHandler.success(res, "Allowance option fetched successfully", allowanceOption);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}