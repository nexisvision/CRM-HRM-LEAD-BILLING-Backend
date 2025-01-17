import Joi from "joi";
import validator from "../../utils/validator.js";
import DeductionOption from "../../models/DeductionOptionModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const deductionOption = await DeductionOption.findByPk(id);
            if (!deductionOption) {
                return responseHandler.error(res, "Deduction option not found");
            }
            await deductionOption.update({
                name,
                updated_by: req.user?.username
            });
            return responseHandler.success(res, "Deduction option updated successfully", deductionOption);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
