import Joi from "joi";
import Training from "../../models/trainingModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            category: Joi.string().required(),
            links: Joi.object().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { category, links } = req.body
            const training = await Training.create({
                category,
                links,
                created_by: req.user?.username
            })
            responseHandler.success(res, "Training created successfully", training)
        } catch (error) {
            responseHandler.error(res, error.message)
        }
    }
}
