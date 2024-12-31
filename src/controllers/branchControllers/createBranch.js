import Joi from "joi";
import Branch from "../../models/branchModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            branchName: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { branchName } = req.body;

            // Check if branch with same name already exists
            const existingBranch = await Branch.findOne({
                where: { branchName }
            });

            if (existingBranch) {
                return responseHandler.error(res, "Branch with this name already exists");
            }

            const branch = await Branch.create({
                branchName,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Branch created successfully", branch);
        } catch (error) {
            console.error('Error creating branch:', error);
            responseHandler.error(res, error.message);
        }
    }
};
