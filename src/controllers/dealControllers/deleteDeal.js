import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Deal ID must be a string',
                'string.empty': 'Deal ID is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            await Deal.destroy({ where: { id } });
            responseHandler.success(res, "Deal deleted successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}