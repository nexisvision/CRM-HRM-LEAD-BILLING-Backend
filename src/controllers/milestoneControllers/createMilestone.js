import Activity from "../../models/activityModel.js";
import Milestone from "../../models/milestoneModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().optional().allow('', null)
        }),
        body: Joi.object({
            milestone_title: Joi.string().optional().allow('', null),
            milestone_status: Joi.string().optional().allow('', null),
            milestone_cost: Joi.string().optional().allow('', null),
            add_cost_to_project_budget: Joi.string().optional().allow('', null),
            milestone_summary: Joi.string().optional().allow('', null),
            milestone_start_date: Joi.date().optional().allow('', null),
            milestone_end_date: Joi.date().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { milestone_title, milestone_status, milestone_cost, add_cost_to_project_budget, milestone_summary, milestone_start_date, milestone_end_date } = req.body;
            const existingMilestone = await Milestone.findOne({ where: { milestone_title, milestone_status, milestone_cost, add_cost_to_project_budget, milestone_summary, milestone_start_date, milestone_end_date, related_id: id } });
            if (existingMilestone) {
                return responseHandler.error(res, "Milestone already exists");
            }
            const milestone = await Milestone.create({
                related_id: id,
                milestone_title,
                milestone_status,
                milestone_cost,
                add_cost_to_project_budget,
                milestone_summary,
                milestone_start_date,
                milestone_end_date,
                client_id: req.des?.client_id,
                created_by: req.user?.username,

            });
            await Activity.create({
                related_id: id,
                activity_from: "milestone",
                activity_id: milestone.id,
                action: "created",
                performed_by: req.user?.username,
                activity_message: `Milestone ${milestone_title} created successfully`
            });
            return responseHandler.success(res, "Milestone created successfully", milestone);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}