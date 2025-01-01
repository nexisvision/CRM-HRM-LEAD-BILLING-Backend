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
            const milestone = await Milestone.findByPk(id);
            if (!milestone) {
                return responseHandler.error(res, "Milestone not found");
            }
            await milestone.update({ milestone_title, milestone_status, milestone_cost, currency, add_cost_to_project_budget, milestone_summary, milestone_start_date, milestone_end_date, updated_by: req.user?.username });
            responseHandler.success(res, "Milestone updated successfully", milestone);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}