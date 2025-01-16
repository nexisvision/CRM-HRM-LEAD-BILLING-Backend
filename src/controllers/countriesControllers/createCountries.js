import Country from "../../models/countriesModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";


export default {
    validator: validator({
        body: Joi.object({
            countryName: Joi.string().required(),
            countryCode: Joi.string().required(),
            phoneCode: Joi.string().required()
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

            return responseHandler.success(res, "Country created successfully", country);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
};
