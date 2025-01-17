import Joi from "joi";
import Branch from "../../models/branchModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            branchName: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { branchName } = req.body;
            const branch = await Branch.findByPk(id);
            if (!branch) {
                return responseHandler.error(res, "Branch not found");
            }
            await branch.update({ branchName, updated_by: req.user?.username });
            return responseHandler.success(res, "Branch updated successfully", branch);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};