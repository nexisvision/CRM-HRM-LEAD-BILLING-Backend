import Joi from "joi";
import Lead from "../../models/leadModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";
import sequelize from "../../config/db.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            lead_members: Joi.object({
                lead_members: Joi.array().items(Joi.string()).optional()
            }).optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { lead_members } = req.body;

            // Safely access project_members array from the payload
            const newMemberIds = lead_members?.lead_members || [];

            const lead = await Lead.findByPk(id);

            if (!lead) {
                return responseHandler.notFound(res, "Lead not found");
            }

            // Parse project_members if it's a string
            const currentLeadMembers = typeof lead.lead_members === 'string'
                ? JSON.parse(lead.lead_members)
                : lead.lead_members;

            // Get current members array
            const currentMembers = currentLeadMembers?.lead_members || [];

            // Check for duplicate members
            const duplicateMembers = newMemberIds.filter(id => currentMembers.includes(id));
            if (duplicateMembers.length > 0) {
                    return responseHandler.error(res, `These members already exist in lead: ${duplicateMembers.join(', ')}`);
            }

            // Combine existing members with new members
            const updatedMembers = [...currentMembers, ...newMemberIds];


            // const existingProjectMembers = await Project.findOne({ where: { project_members: { project_members: updatedMembers, id: { [Op.not]: project.id } } } });


            const existingLeadMembers = await Lead.findOne({
                where: {
                    [Op.and]: [
                        sequelize.literal(`JSON_SEARCH(lead_members, 'one', '${JSON.stringify(updatedMembers)}') IS NOT NULL`),
                        { id: { [Op.not]: lead.id } }
                    ]
                }
            });
            if (existingLeadMembers) {
                return responseHandler.error(res, "Lead members already exist");
            }
            // Update the project with the new members list
            await lead.update({
                lead_members: { lead_members: updatedMembers },
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Lead members added successfully", {
                lead_members: { lead_members: updatedMembers }
            });
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};
