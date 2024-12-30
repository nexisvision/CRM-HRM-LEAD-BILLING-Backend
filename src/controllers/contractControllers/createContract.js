import Contract from "../../models/contractModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            subject: Joi.string().required(),
            project: Joi.string().required(),
            type: Joi.string().required(),
            value: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { subject, project, type, value, startDate, endDate } = req.body;
            const contract = await Contract.create({ subject, project, type, value, startDate, endDate, created_by: req.user?.id });
            return responseHandler(res, "Contract created successfully", contract);
        } catch (error) {
            return responseHandler(res, error.message);
        }
    }
}
