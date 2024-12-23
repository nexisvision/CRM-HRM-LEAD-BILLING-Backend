import Joi from "joi";
import Permission from "../../models/permissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { name, description } = req.body;

            // Check if permission already exists
            const existingPermission = await Permission.findOne({
                where: { name }
            });

            if (existingPermission) {
                return responseHandler.error(res, "Permission already exists");
            }

            const permission = await Permission.create({
                name,
                description
            });

            responseHandler.created(res, "Permission created successfully", permission);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}; 