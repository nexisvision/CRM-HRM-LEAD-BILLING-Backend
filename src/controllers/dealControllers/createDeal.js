import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            dealName: Joi.string().required().messages({
                'string.base': 'Deal name must be a string',
                'string.empty': 'Deal name is required'
            }),
            phoneNumber: Joi.string().required().pattern(/^[0-9]+$/).messages({
                'string.base': 'Phone number must be a number',
                'string.empty': 'Phone number is required',
                'string.pattern.base': 'Phone number must contain only digits'
            }),
            price: Joi.number().required().positive().messages({
                'number.base': 'Price must be a number',
                'number.empty': 'Price is required',
                'number.positive': 'Price must be a positive number'
            }),
            clients: Joi.string().required().messages({
                'string.base': 'Clients must be a string',
                'string.empty': 'Clients is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { dealName, phoneNumber, price, clients } = req.body;
            
            const deal = await Deal.create({
                dealName,
                phoneNumber, 
                price,
                clients
            });

            responseHandler.success(res, "Deal created successfully", deal);
        } catch (error) {
            console.error('Error creating deal:', error);
            responseHandler.error(res, error.message);
        }
    }
};
