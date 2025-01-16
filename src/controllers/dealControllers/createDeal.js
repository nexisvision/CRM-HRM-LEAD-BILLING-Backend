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
            stage: Joi.string().required(),
            price: Joi.number().required(),
            currency: Joi.string().required(),
            closedDate: Joi.date().required(),
            category: Joi.string().required(),
            project: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { leadTitle, dealName, pipeline, stage, price, currency, closedDate, category, project } = req.body;

            const deal = await Deal.create({
                leadTitle,
                dealName,
                pipeline,
                stage,
                price,
                currency,
                closedDate,
                category,
                project,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Deal created successfully", deal);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
