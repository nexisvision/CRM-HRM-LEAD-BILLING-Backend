import Joi from "joi";
import Project from "../../models/projectModel.js";
import Client from "../../models/clientModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            project_name: Joi.string().required(),
            category: Joi.string().required(),
            startdate: Joi.date().required(),
            enddate: Joi.date().required(),
            projectimage: Joi.string().required(),
            client: Joi.string().allow('', null).optional(),
            user: Joi.string().allow('', null).optional(),
            budget: Joi.number().required(),
            estimatedmonths: Joi.number().required(),
            estimatedhours: Joi.number().required(),
            project_description: Joi.string().allow('', null).optional(),
            tag: Joi.string().required(),
            status: Joi.string().valid('pending', 'in_progress', 'completed', 'on_hold').required()
        })
    }),
    handler: async (req, res) => {
        try {
            const {
                project_name,
                category,
                startdate,
                enddate,
                projectimage,
                client,
                user,
                budget,
                estimatedmonths,
                estimatedhours,
                project_description,
                tag,
                status
            } = req.body;

            // Check if client exists
            if (client) {
                const clientExists = await Client.findByPk(client);
                if (!clientExists) {
                    return responseHandler.notFound(res, "Client not found");
                }
            }

            // Check if project name already exists
            const existingProject = await Project.findOne({
                where: { project_name }
            });

            if (existingProject) {
                return responseHandler.error(res, "Project with this name already exists");
            }

            const project = await Project.create({
                project_name,
                category,
                startdate,
                enddate,
                projectimage,
                client,
                user,
                budget,
                estimatedmonths,
                estimatedhours,
                project_description,
                tag,
                status,
                created_by: req.user?.username,
                updated_by: req.user?.username
            });

            responseHandler.created(res, "Project created successfully", project);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};