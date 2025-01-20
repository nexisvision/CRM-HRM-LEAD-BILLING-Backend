import Joi from "joi";
import Policy from "../../models/policyModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            branch: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().optional().allow('', null),
            files: Joi.object().optional().allow(null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { branch, title, description, files } = req.body;
            const existingPolicy = await Policy.findOne({ where: { title } });
            if (existingPolicy) {
                return responseHandler.error(res, "Policy already exists");
            }
            const policy = await Policy.create({ branch, title, description, files, created_by: req.user?.username });
            return responseHandler.success(res, "Policy created successfully", policy);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}