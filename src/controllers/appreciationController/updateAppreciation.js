import Joi from "joi";
import Appreciation from "../../models/appreciationModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            award: Joi.string().optional(),
            givenTo: Joi.string().optional(),
            date: Joi.date().optional(),
            summary: Joi.string().optional().allow('', null),
            photo: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { award, givenTo, date, summary, photo } = req.body;
            const appreciation = await Appreciation.findByPk(id);
            if (!appreciation) {
                return responseHandler.error(res, "Appreciation not found");
            }
            await appreciation.update({ award, givenTo, date, summary, photo, updated_by: req.user?.username });
            return responseHandler.success(res, "Appreciation updated successfully", appreciation);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}