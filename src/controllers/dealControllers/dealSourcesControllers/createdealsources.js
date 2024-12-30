import responseHandler from "../../../utils/responseHandler.js";
import Deal from "../../../models/dealModel.js";
import Joi from "joi";
import validator from "../../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            dealId: Joi.string().required()
        }),
        body: Joi.object({
            sources: Joi.array().items(Joi.string()).required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { dealId } = req.params;
            const { sources } = req.body;

            // Find the deal
            const deal = await Deal.findByPk(dealId);
            if (!deal) {
                return responseHandler.error(res, "Deal not found", 404);
            }

            // Update the sources array
            const updatedSources = [...deal.sources, ...sources];
            await deal.update({ sources: updatedSources });


            
            responseHandler.success(res, "Sources added to deal successfully", deal);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}
