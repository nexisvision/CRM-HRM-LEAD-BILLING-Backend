import Project from "../../models/projectModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional().default(1),
            limit: Joi.number().optional().default(10)
        })
    }),
    handler: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const projects = await Project.findAll({
                offset: (page - 1) * limit,
                limit: limit
            });
            responseHandler.success(res, "Projects fetched successfully", projects);
        }
        catch (error) {
        responseHandler.error(res, error.message);
        }
    }
}