import DealUser from "../../../models/dealandleadUserModel.js";
import Joi from "joi";
import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";


export default {
    validator: validator({
        params: Joi.object({
            dealId: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().default(1).optional(),
            limit: Joi.number().default(10).optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { dealId } = req.params;
            const { page, limit } = req.query;
            const offset = (page - 1) * limit;
            const deals = await DealUser.findAll({ where: { dealId }, offset, limit });
            responseHandler.success(res, "Deal users fetched successfully", deals);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}
