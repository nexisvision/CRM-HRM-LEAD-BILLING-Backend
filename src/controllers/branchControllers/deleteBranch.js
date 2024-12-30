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
            await Branch.destroy({ where: { id } });
            responseHandler.success(res, "Branch deleted successfully");
        } catch (error) {
            console.error('Error deleting branch:', error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};