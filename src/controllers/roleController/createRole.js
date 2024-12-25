import Joi from "joi";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            role_name: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { role_name } = req.body;
            const role = await Role.create({ role_name });
            responseHandler(res, 201, 'Role created successfully', role);
        } catch (error) {
            responseHandler(res, 500, error.message);
        }
    }
}