import Milestone from "../../models/milestoneModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            project_id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { project_id } = req.params;
            const milestones = await Milestone.findAll({ where: { project_id } });
            responseHandler.success(res, "Milestones fetched successfully", milestones);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}