import Country from "../../models/countriesModel.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator,
    params: Joi.object({
        id: Joi.string().required()
    }),
    body: Joi.object({
        countryName: Joi.string().required(),
        countryCode: Joi.string().required(),
        phoneCode: Joi.string().required()
    }),

    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { countryName, countryCode, phoneCode } = req.body;
            const country = await Country.findByPk(id);
            await country.update({ countryName, countryCode, phoneCode });
            res.status(200).json({ message: "Country updated successfully" });
        } catch (error) {
            console.error('Error updating country:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}   
