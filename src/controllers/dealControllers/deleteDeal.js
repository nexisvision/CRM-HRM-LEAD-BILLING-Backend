import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const deal = await Deal.findByPk(id);
            if (!deal) {
                responseHandler.error(res, "Deal not found");
            }
            await deal.destroy();
            responseHandler.success(res, "Deal deleted successfully", deal);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
}