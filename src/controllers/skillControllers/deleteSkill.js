import Skill from "../../models/skillModel.js";
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

            const skill = await Skill.findByPk(id);
            if (!skill) {
                responseHandler.notFound(res, "Skill not found");
            }
            await skill.destroy();
            responseHandler.success(res, "Skill deleted successfully", skill);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}