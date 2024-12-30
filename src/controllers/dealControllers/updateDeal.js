import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Deal ID must be a string',
                'string.empty': 'Deal ID is required'
            })
        }),
        body: Joi.object({
            dealName: Joi.string().optional().messages({
                // 'string.base': 'Deal name must be a string',
                // 'string.empty': 'Deal name is required'
            }),
            phoneNumber: Joi.string().optional().messages({
                'string.base': 'Phone number must be a number',
                // 'string.empty': 'Phone number is required'
            }),
            price: Joi.number().optional().messages({
                'number.base': 'Price must be a number',
                'number.positive': 'Price must be a positive number',
                // 'number.empty': 'Price is required'
            }),
            clients: Joi.string().optional().messages({
                // 'string.base': 'Clients must be a string',
                // 'string.empty': 'Clients is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { dealName, phoneNumber, price, clients } = req.body;
            const deal = await Deal.findByPk(id);
            if (!deal) {
                return responseHandler.error(res, "Deal not found", 404);
            }
            await deal.update({ dealName, phoneNumber, price, clients });
            responseHandler.success(res, "Deal updated successfully", deal);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}