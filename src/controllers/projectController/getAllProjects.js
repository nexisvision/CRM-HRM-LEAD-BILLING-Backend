import Joi from "joi";
import validator from "../../utils/validator.js";
import Project from "../../models/projectModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number(),
            limit: Joi.number()
        })
    }),
    handler: async (req, res) => {
        try {
            const projects = await Project.findAll();
            return responseHandler.success(res, "Projects fetched successfully", projects);
        }
        catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}