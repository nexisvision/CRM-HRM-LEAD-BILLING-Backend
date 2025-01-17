import Joi from "joi";
import Branch from "../../models/branchModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            branchName: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { branchName } = req.body;
            const branch = await Branch.create({
                branchName,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Branch created successfully", branch);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
