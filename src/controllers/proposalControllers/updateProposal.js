import Joi from "joi";
import Proposal from "../../models/proposalModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            lead_title: Joi.string().required(),
            deal_title: Joi.string().required(),
            valid_till: Joi.date().required(),
            currency: Joi.string().required(),
            calculatedTax: Joi.number().required(),
            description: Joi.string().required(),
            items: Joi.array().required(),
            discount: Joi.number().optional(),
            tax: Joi.number().optional(),
            total: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { lead_title, deal_title, valid_till, currency, calculatedTax, description, items, discount, tax, total } = req.body;
            const proposal = await Proposal.findByPk(id);
            if (!proposal) {
                return responseHandler.notFound(res, "Proposal not found");
            }
            await proposal.update({ lead_title, deal_title, valid_till, currency, calculatedTax, description, items, discount, tax, total, updated_by: req.user?.username });
            return responseHandler.success(res, "Proposal updated successfully", proposal);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}