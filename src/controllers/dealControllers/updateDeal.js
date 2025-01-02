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
            const { id } = req.params;
            const { leadTitle, dealName, pipeline, stage, price, currency, closedDate, category, project } = req.body;
            const deal = await Deal.findByPk(id);
            if (!deal) {
                return responseHandler.error(res, "Deal not found");
            }
            await deal.update({ leadTitle, dealName, pipeline, stage, price, currency, closedDate, category, project, updated_by: req.user?.username });
            responseHandler.success(res, "Deal updated successfully", deal);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}