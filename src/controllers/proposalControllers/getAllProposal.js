import Proposal from "../../models/proposalModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const proposals = await Proposal.findAll();
            responseHandler.success(res, "Proposals fetched successfully", proposals);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}