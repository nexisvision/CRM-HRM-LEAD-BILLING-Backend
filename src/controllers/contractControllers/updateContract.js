import Contract from "../../models/contractModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            subject: Joi.string().required(),
            project: Joi.string().required(),
            type: Joi.string().required(),
            value: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            description: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { subject, project, type, value, startDate, endDate, description } = req.body;
            const contract = await Contract.findByPk(id);
            await contract.update({ subject, project, type, value, startDate, endDate, description });
            return responseHandler.success(res, "Contract updated successfully", contract);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}
