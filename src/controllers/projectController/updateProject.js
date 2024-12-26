import Joi from "joi";
import Project from "../../models/projectModel.js";
import Client from "../../models/clientModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            project_name: Joi.string(),
            startdate: Joi.date(),
            enddate: Joi.date(),
            projectimage: Joi.string(),
            client: Joi.string(),
            user: Joi.string(),
            budget: Joi.number(),
            estimatedmonths: Joi.number(),
            project_description: Joi.string().allow(''),
            tags: Joi.alternatives().try(
                Joi.array().items(Joi.string()).min(1),
                Joi.string()
            ),
            status: Joi.string().valid('pending', 'in_progress', 'completed', 'on_hold')
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                project_name,
                startdate,
                enddate,
                projectimage,
                client,
                user,
                budget,
                estimatedmonths,
                project_description,
                tags,
                status
            } = req.body;

            // Find existing project
            const project = await Project.findByPk(id);
            if (!project) {
                return responseHandler.notFound(res, "Project not found");
            }

            // Process tags if provided
            let processedTags = project.tags; // Keep existing tags by default
            if (tags) {
                // Convert string to array if needed
                processedTags = Array.isArray(tags)
                    ? tags
                    : tags.split(',').map(tag => tag.trim());

                // Remove duplicates and empty tags
                processedTags = [...new Set(processedTags)].filter(tag => tag);
            }

            // Check if client exists if client is being updated
            if (client) {
                const clientExists = await Client.findByPk(client);
                if (!clientExists) {
                    return responseHandler.notFound(res, "Client not found");
                }
            }

            // Check if new project name already exists (if being updated)
            if (project_name && project_name !== project.project_name) {
                const existingProject = await Project.findOne({
                    where: { project_name }
                });

                if (existingProject) {
                    return responseHandler.error(res, "Project with this name already exists");
                }
            }

            // Update project
            const updatedProject = await project.update({
                project_name,
                startdate,
                enddate,
                projectimage,
                client,
                user,
                budget,
                estimatedmonths,
                project_description: project_description ?? project.project_description,
                tags: tags ? processedTags : project.tags,
                status: status || project.status,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Project updated successfully", updatedProject);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};


