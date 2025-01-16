import Joi from "joi";
import Project from "../../models/projectModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            project_name: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            // project_members: Joi.object().optional(),
            project_category: Joi.string().required(),
            project_description: Joi.string().allow('', null).optional(),
            department: Joi.object().allow(null).optional(),
            client: Joi.string().allow('', null).optional(),
            currency: Joi.string().allow('', null).optional(),
            budget: Joi.number().required(),
            estimatedmonths: Joi.number().required(),
            estimatedhours: Joi.number().required(),
            files: Joi.array().allow(null).optional(),
            status: Joi.string().allow('', null).optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const {
                project_name,
                startDate,
                endDate,
                // project_members,
                project_category,
                project_description,
                department,
                client,
                currency,
                budget,
                estimatedmonths,
                estimatedhours,
            } = req.body;

            const existingProject = await Project.findOne({
                where: { project_name }
            });

            if (existingProject) {
                responseHandler.error(res, "Project with this name already exists");
            }

            const project = await Project.create({
                project_name,
                startDate,
                endDate,
                // project_members,
                project_category,
                project_description,
                department,
                client,
                currency,
                budget,
                estimatedmonths,
                estimatedhours,
                created_by: req.user?.username,
            });

            responseHandler.created(res, "Project created successfully", project);
        } catch (error) {

            responseHandler.error(res, error.message);
        }
    }
};