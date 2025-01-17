import Joi from "joi";
import Appreciation from "../../models/appreciationModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";


export default {
    validator: validator({
        body: Joi.object({
            award: Joi.string().required(),
            givenTo: Joi.string().required(),
            date: Joi.date().required(),
            summary: Joi.string().optional().allow('', null),
            photo: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { award, givenTo, date, summary, photo } = req.body;
            const appreciation = await Appreciation.create({ award, givenTo, date, summary, photo });
            return responseHandler.success(res, "Appreciation created successfully", appreciation);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}