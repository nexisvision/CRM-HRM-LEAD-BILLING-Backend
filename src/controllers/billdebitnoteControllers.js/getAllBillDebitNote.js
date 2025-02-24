import Joi from "joi";
import validator from "../../utils/validator.js";
import BillDebitnote from "../../models/billdebitnoteModel.js";
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
            const billDebitnote = await BillDebitnote.findAll({ where: { related_id: id } });
            return responseHandler.success(res, "billDebitnote fetched successfully", billDebitnote);

        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}