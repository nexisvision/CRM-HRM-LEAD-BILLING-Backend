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
            category: Joi.string().optional(),
            project: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { leadTitle, dealName, pipeline, stage, price, currency, closedDate, category, project } = req.body;

            const existingDeal = await Deal.findOne({ where: { dealName } });
            if (existingDeal) {
                return responseHandler.error(res, "Deal already exists");
            }

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

            return responseHandler.success(res, "Deal created successfully", deal);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
