import Milestone from "../../models/milestoneModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const milestone = await Milestone.findByPk(id);
            if (!milestone) {
                return responseHandler.error(res, "Milestone not found");
            }
            await milestone.destroy();
            responseHandler.success(res, "Milestone deleted successfully", milestone);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}