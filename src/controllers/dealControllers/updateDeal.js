import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            leadTitle: Joi.string().required(),            
            dealName: Joi.string().required(),            
            pipeline: Joi.string().required(),            
            deal_stage: Joi.string().required(),            
            deal_price: Joi.number().required().positive(),            
            currency: Joi.string().required(),            
            closed_date: Joi.date().required(),            
            deal_category: Joi.string().required(),            
            deal_agent: Joi.string().required(),            
            project: Joi.string().required(),     
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { leadTitle, dealName, pipeline, deal_stage, deal_price, currency, closed_date, deal_category, deal_agent, project } = req.body;
            const deal = await Deal.findByPk(id);
            if (!deal) {
                return responseHandler.error(res, "Deal not found");
            }
            await deal.update({ leadTitle, dealName, pipeline, deal_stage, deal_price, currency, closed_date, deal_category, deal_agent, project });
            responseHandler.success(res, "Deal updated successfully", deal);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}