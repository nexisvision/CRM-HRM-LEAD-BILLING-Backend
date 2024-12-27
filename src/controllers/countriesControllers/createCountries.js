import Country from "../../models/countriesModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";  
import validator from "../../utils/validator.js";


export default {
    validator: validator({
        body: Joi.object({
            countryName: Joi.string().required().messages({
                'string.base': 'Country name must be a string',
                'string.empty': 'Country name is required'
            }),
            countryCode: Joi.string().required().messages({
                'string.base': 'Country code must be a string',
                'string.empty': 'Country code is required'
            }),
            phoneCode: Joi.string().required().messages({
                'string.base': 'Phone code must be a string', 
                'string.empty': 'Phone code is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { countryName, countryCode, phoneCode } = req.body;

            const country = await Country.create({
                countryName,
                countryCode,
                phoneCode,
                created_by: req.user?.username
            });

            responseHandler.success(res, "Country created successfully", country);
        } catch (error) {
            console.error('Error creating country:', error);
            responseHandler.error(res, error.message);
        }
    }
};
