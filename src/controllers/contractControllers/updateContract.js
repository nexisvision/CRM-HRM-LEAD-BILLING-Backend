import Contract from "../../models/contractModel.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator,
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
    }),

    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { subject, project, type, value, startDate, endDate } = req.body;
            const contract = await Contract.findByPk(id);
            await contract.update({ subject, project, type, value, startDate, endDate });
            res.status(200).json({ message: "Contract updated successfully" });
        } catch (error) {
            console.error('Error updating contract:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}   
