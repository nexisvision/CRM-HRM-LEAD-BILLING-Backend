import Activity from "../../models/activityModel.js";
import Milestone from "../../models/milestoneModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            milestone_title: Joi.string().required(),
            milestone_status: Joi.string().required(),
            milestone_cost: Joi.number().required(),
            currency: Joi.string().required(),
            add_cost_to_project_budget: Joi.boolean().required(),
            milestone_summary: Joi.string().required(),
            milestone_start_date: Joi.date().required(),
            milestone_end_date: Joi.date().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { milestone_title, milestone_status, milestone_cost, currency, add_cost_to_project_budget, milestone_summary, milestone_start_date, milestone_end_date } = req.body;
            const milestone = await Milestone.create({
                related_id: id,
                milestone_title,
                milestone_status,
                milestone_cost,
                currency,
                add_cost_to_project_budget,
                milestone_summary,
                milestone_start_date,
                milestone_end_date,
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
            responseHandler.success(res, "Milestone created successfully", milestone);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}