import Joi from "joi";
import Currency from "../../models/currencyModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            currencyName: Joi.string().required().messages({
                'string.base': 'Currency name must be a string',
                'string.empty': 'Currency name is required'
            }),
            currencyIcon: Joi.string().required().messages({
                'string.base': 'Currency icon must be a string',
                'string.empty': 'Currency icon is required'
            }),
            currencyCode: Joi.string().required().messages({
                'string.base': 'Currency code must be a string',
                'string.empty': 'Currency code is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { currencyName, currencyIcon, currencyCode } = req.body;

            const currency = await Currency.create({
                currencyName,
                currencyIcon,
                currencyCode,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Currency created successfully", currency);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
};
