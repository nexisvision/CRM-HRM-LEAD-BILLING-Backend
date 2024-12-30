import Contract from "../../models/contractModel.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator,
    params: Joi.object({
        id: Joi.string().required().messages({
            'string.base': 'Id must be a string',
            'string.empty': 'Id is required'
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const contract = await Contract.findByPk(id);
            res.status(200).json({ message: "Contract fetched successfully", contract });
        } catch (error) {
            console.error('Error fetching contract:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}