import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
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
            const { leadTitle, dealName,pipeline,deal_stage,deal_price,currency,closed_date,deal_category,deal_agent,project } = req.body;

            const deal = await Deal.create({
                leadTitle,
                dealName,
                pipeline,
                deal_stage,
                deal_price,
                currency,
                closed_date,
                deal_category,
                deal_agent,
                project
            });

            responseHandler.success(res, "Deal created successfully", deal);
        } catch (error) {
            console.error('Error creating deal:', error);
            responseHandler.error(res, error.message);
        }
    }
};
