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
            branchName: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { branchName } = req.body;
            await Branch.update({ branchName, updated_by: req.user?.username }, { where: { id } });
            responseHandler.success(res, "Branch updated successfully", Branch);
        } catch (error) {
            console.error('Error updating branch:', error);
            responseHandler.error(res, error.message);
        }
    }
};