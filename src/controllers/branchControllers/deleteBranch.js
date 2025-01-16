import Joi from "joi";
import Branch from "../../models/branchModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const branch = await Branch.findByPk(id);
            if (!branch) {
                responseHandler.error(res, "Branch not found");
            }
            await branch.destroy();
            responseHandler.success(res, "Branch deleted successfully");
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};