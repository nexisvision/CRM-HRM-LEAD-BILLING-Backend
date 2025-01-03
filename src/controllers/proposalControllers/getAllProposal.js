import Proposal from "../../models/proposalModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().required(),
            limit: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const proposals = await Proposal.findAll();
            return responseHandler.success(res, "Proposals fetched successfully", proposals);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}