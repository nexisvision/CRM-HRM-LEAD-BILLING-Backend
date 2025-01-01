import Joi from "joi";
import Project from "../../models/projectModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            project_members: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const memberIdToDelete = req.body.project_members;

            const project = await Project.findByPk(id);

            if (!project) {
                return responseHandler.notFound(res, "Project not found");
            }

            // Parse project_members if it's a string
            const projectMembers = typeof project.project_members === 'string' 
                ? JSON.parse(project.project_members) 
                : project.project_members;

            // Ensure we have an array to work with
            const currentMembers = projectMembers?.project_members || [];

            // Check if member exists in the project
            if (!currentMembers.includes(memberIdToDelete)) {
                return responseHandler.error(res, `Member not found in project: ${memberIdToDelete}`);
            }

            // Create new array without the specified member
            const updatedMembers = currentMembers.filter(member => member !== memberIdToDelete);

            // Update the project with the new members list
            await project.update({
                project_members: { project_members: updatedMembers },
                updated_by: req.user?.username
            });

            responseHandler.success(res, "Project member deleted successfully", {
                project_members: { project_members: updatedMembers }
            });
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};

// import Joi from "joi";
// import Project from "../../models/projectModel.js";
// import validator from "../../utils/validator.js";
// import responseHandler from "../../utils/responseHandler.js";

// export default {
//     validator: validator({
//         params: Joi.object({
//             id: Joi.string().required()
//         }),
//         body: Joi.object({
//             project_members: Joi.array().items(Joi.string()).required()
//         })
//     }),
//     handler: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const { project_members } = req.body;

//             const project = await Project.findByPk(id);

//             if (!project) {
//                 return responseHandler.notFound(res, "Project not found");
//             }

//             // Parse project_members if it's a string
//             const projectMembers = typeof project.project_members === 'string' 
//                 ? JSON.parse(project.project_members) 
//                 : project.project_members;

//             // Ensure we have an array to work with
//             const currentMembers = projectMembers?.project_members || [];

//             // Check if all memberIds to delete exist in the project
//             const nonExistingMembers = project_members.filter(id => !currentMembers.includes(id));
//             if (nonExistingMembers.length > 0) {
//                 return responseHandler.error(res, `Some members not found in project: ${nonExistingMembers.join(', ')}`);
//             }

//             // Create new array without the specified members
//             const updatedMembers = [];
//             for (let member of currentMembers) {
//                 if (!memberIds.includes(member)) {
//                     updatedMembers.push(member);
//                 }
//             }

//             // Update the project with the new members list
//             await project.update({
//                 project_members: { members: updatedMembers },
//                 updated_by: req.user?.username
//             });

//             responseHandler.success(res, "Project members deleted successfully", {
//                 project_members: { members: updatedMembers }
//             });
//         } catch (error) {
//             console.log(error);
//             responseHandler.error(res, error.message);
//         }
//     }
// };