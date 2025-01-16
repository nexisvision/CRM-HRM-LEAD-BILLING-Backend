import Joi from "joi";
import Skill from "../../models/skillModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            skillName: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { skillName } = req.body;
            const skill = await Skill.findByPk(id);
            if (!skill) {
                responseHandler.notFound(res, "Skill not found");
            }
            await skill.update({ skillName, updated_by: req.user?.username });
            responseHandler.success(res, "Skill updated successfully", skill);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}