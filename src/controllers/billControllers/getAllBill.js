import Joi from "joi";
import Bill from "../../models/billModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const bills = await Bill.findAll({ where: { related_id: id } });
            return responseHandler.success(res, "Bills fetched successfully", bills);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}