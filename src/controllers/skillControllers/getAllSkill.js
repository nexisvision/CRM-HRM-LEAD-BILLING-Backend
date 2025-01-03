import Skill from "../../models/skillModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional().default(1),
            limit: Joi.number().optional().default(10)
        })
    }),
    handler: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const skills = await Skill.findAll({
               
            });
            return responseHandler.success(res, "Skills fetched successfully", skills);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }

}