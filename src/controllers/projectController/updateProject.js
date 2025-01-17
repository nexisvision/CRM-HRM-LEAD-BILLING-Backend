import Joi from "joi";
import Project from "../../models/projectModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().optional()
        }),
        body: Joi.object({
            project_name: Joi.string().optional(),
            startDate: Joi.date().optional(),
            endDate: Joi.date().optional(),
            project_members: Joi.object().allow('', null).optional(),
            project_category: Joi.string().optional(),
            project_description: Joi.string().allow('', null).optional(),
            department: Joi.object().allow(null).optional(),
            client: Joi.string().allow('', null).optional(),
            currency: Joi.string().allow('', null).optional(),
            budget: Joi.number().optional(),
            estimatedmonths: Joi.number().optional(),
            estimatedhours: Joi.number().optional(),
            files: Joi.array().allow(null).optional(),
            status: Joi.string().allow('', null).optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                project_name,
                startDate,
                endDate,
                project_members,
                project_category,
                project_description,
                department,
                client,
                currency,
                budget,
                estimatedmonths,
                estimatedhours,
                files,
                status
            } = req.body;

            const project = await Project.findByPk(id);

            if (!project) {
                return responseHandler.notFound(res, "Project not found");
            }

            const existingProject = await Project.findOne({
                where: { project_name }
            });

            if (existingProject) {
                return responseHandler.error(res, "Project with this name already exists");
            }

            const updatedProject = await project.update({
                project_name,
                startDate,
                endDate,
                project_members,
                project_category,
                project_description,
                department,
                client,
                currency,
                budget,
                estimatedmonths,
                estimatedhours,
                files,
                status,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Project updated successfully", updatedProject);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};
