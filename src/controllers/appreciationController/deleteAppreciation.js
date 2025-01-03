import Joi from "joi";
import Appreciation from "../../models/appreciationModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const appreciation = await Appreciation.findByPk(id);
            if (!appreciation) {
                return responseHandler.error(res, "Appreciation not found");
            }
            await appreciation.destroy();
            return responseHandler.success(res, "Appreciation deleted successfully", appreciation);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}