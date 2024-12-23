import Joi from "joi";
import Project from "../../models/projectModel.js";
import Client from "../../models/clientModel.js";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            // id: Joi.string().required(),
            project_name: Joi.string().required(),
            startdate: Joi.date().required(),
            enddate: Joi.date().required(),
            projectimage: Joi.string().required(),
            client: Joi.string().required(),
            user: Joi.string().required(),
            budget: Joi.number().required(),
            estimatedmonths: Joi.number().required(),
            project_description: Joi.string().allow(''),
            tag: Joi.string().required(),
            status: Joi.string().valid('pending', 'in_progress', 'completed', 'on_hold').required()
        })
    }),
    handler: async (req, res) => {
       
        try {
             const { project_name, startdate,
                enddate, projectimage, client,
                user, budget, estimatedmonths, 
                project_description, tag,
             status } = req.body;
             const clientExists = await Client.findByPk(client);
             if (!clientExists) {
                 return responseHandler.notFound(res, "Client not found");
             }
             const existingProject = await Project.findOne({
                where: { project_name }
            });
             if (existingProject) {
                return responseHandler.error(res, "Project with this name already exists");
            }
        
            const { id } = req.params;
            const project = await Project.findByPk(id);
    
        if (!project) {
            return responseHandler.error(res, "Project not found");
        }
        const updatedProject = await project.update({
            project_name,
            startdate,
            enddate,
            projectimage,
            client,
            user,
            budget,
            estimatedmonths,
            project_description,
            tag,
            status,
            // updated_by: req.user?.id
        });
        responseHandler.success(res, "Project updated successfully", updatedProject);
    
    }
    
    catch (error) {
        responseHandler.error(res, error.message);
    }
    }
}


