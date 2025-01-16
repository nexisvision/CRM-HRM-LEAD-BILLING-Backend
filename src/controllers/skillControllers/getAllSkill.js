import Skill from "../../models/skillModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const skills = await Skill.findAll();
            return responseHandler.success(res, "Skills fetched successfully", skills);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }

}