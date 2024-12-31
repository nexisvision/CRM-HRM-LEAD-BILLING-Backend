import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Sources from "../../models/sourcesModel.js";
import Joi from "joi";

export default {
    validator: validator({
        body: Joi.object({
            sourceName: Joi.string().required(),
            description: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { sourceName, description } = req.body;

            // Check if source name already exists
            const existingSource = await Sources.findOne({
                where: { sourceName }
            });

            if (existingSource) {
                return responseHandler.error(res, "Source with this name already exists");
            }

            const source = await Sources.create({
                sourceName,
                description,
                created_by: req.user?.username
            });

            responseHandler.created(res, "Source created successfully", source);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
