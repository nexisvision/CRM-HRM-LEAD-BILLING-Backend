import LeadUser from "../../../models/dealandleadUserModel.js";
import Joi from "joi";
import responseHandler from "../../../utils/responseHandler.js";
import validator from "../../../utils/validator.js";


export default {
    validator: validator({
        params: Joi.object({
            leadId: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().default(1).optional(),
            limit: Joi.number().default(10).optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { leadId } = req.params;
            const { page, limit }  = req.query;
            const offset = (page - 1) * limit;
            const leads = await LeadUser.findAll({ where: { leadId }, offset, limit });
            responseHandler.success(res, "Lead users fetched successfully", leads);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
        }
}
