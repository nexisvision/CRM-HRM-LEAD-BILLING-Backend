import Joi from "joi";
import Project from "../../models/projectModel.js";
// import Project from "../../models/projectModel.js";
import Client from "../../models/clientModel.js";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
// import sequelize from "../../config/db.js";

export default {
    validator: validator({
        body: Joi.object({
            project_name: Joi.string().required(),
            startdate: Joi.date().required(),
            enddate: Joi.date().required(),
            projectimage: Joi.string().required(),
            client: Joi.string(),
            user: Joi.string(),
            budget: Joi.number().required(),
            estimatedmonths: Joi.number().required(),   
            project_description: Joi.string().allow(''),
            tag: Joi.string().required(),
            status: Joi.string().valid('pending', 'in_progress', 'completed', 'on_hold').required()
        })
    }),
    handler: async (req, res) => {
        try {
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
                tag,
                status 
            } = req.body;

            // Check if client exists
            const clientExists = await Client.findByPk(client);
            if (!clientExists) {
                return responseHandler.notFound(res, "Client not found");
            }

            // Check if user exists
            // const userExists = await User.findByPk(user);
            // if (!userExists) {
            //     return responseHandler.notFound(res, "User not found");
            // }

            // Check if project name already exists
            const existingProject = await Project.findOne({
                where: { project_name }
            });

            
            if (existingProject) {
                return responseHandler.error(res, "Project with this name already exists");
            }

            const project = await Project.create({
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
                // created_by: req.user?.id
            });

            responseHandler.created(res, "Project created successfully", project);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};