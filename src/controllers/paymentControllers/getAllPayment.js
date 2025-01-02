import { query } from "express";
import Payment from "../../models/paymentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

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
           
            const payments = await Payment.findAll({ where: { related_id: id }});
            responseHandler.success(res, "Payments fetched successfully", payments);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}