import Skill from "../../models/skillModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        body: Joi.object({
            skillName: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { skillName } = req.body;
            const skill = await Skill.create({ skillName, created_by: req.user?.username });
            return responseHandler.success(res, "Skill created successfully", skill);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}