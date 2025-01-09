import Joi from "joi";
import Training from "../../models/trainingModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const training = await Training.findAll({
                where: {
                    created_by: req.user?.username
                }
            })
            return responseHandler.success(res, "Training fetched successfully", training)
        } catch (error) {
            return responseHandler.error(res, error.message)
        }
    }
}
