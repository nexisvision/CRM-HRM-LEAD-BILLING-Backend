import Joi from "joi";
import Country from "../../models/countriesModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

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

            const existingCountry = await Country.findOne({ where: { countryName, countryCode, phoneCode } });
            if (existingCountry) {
                return responseHandler.error(res, "Already already exists");
            }

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
