import Joi from "joi";
import validator from "../../utils/validator.js";
import SalesCreditnote from "../../models/salesCreditnoteModel.js";
import responseHandler from "../../utils/responseHandler.js";


export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.user;
            const salesCreditnote = await SalesCreditnote.findAll({ where: { related_id: id } });
            return responseHandler.success(res, "salesCreditnote fetched successfully", salesCreditnote);

        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}