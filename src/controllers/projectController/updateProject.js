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
            project_name: Joi.string().allow('', null),
            category: Joi.string().allow('', null),
            startdate: Joi.date().allow('', null),
            enddate: Joi.date().allow('', null),
            // projectimage: Joi.string().allow('', null),
            client: Joi.string().allow('', null),
            user: Joi.object().allow(null).optional(),
            budget: Joi.number().allow('', null),
            estimatedmonths: Joi.number().allow('', null),
            estimatedhours: Joi.number().allow('', null),
            project_description: Joi.string().allow('', null),
            tag: Joi.string().allow('', null),
            status: Joi.string().valid('pending', 'in_progress', 'completed', 'on_hold').allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                project_name,
                category,
                startdate,
                enddate,
                // projectimage,
                client,
                user,
                budget,
                estimatedmonths,
                estimatedhours,
                project_description,
                tag,
                status
            } = req.body;

            // Find existing project
            const project = await Project.findByPk(id);
            if (!project) {
                return responseHandler.notFound(res, "Project not found");
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
                category,
                startdate,
                enddate,
                //  projectimage,
                client,
                user,
                budget,
                estimatedmonths,
                estimatedhours,
                project_description,
                tag,
                status,
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Project updated successfully", updatedProject);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
