import Country from "../../models/countriesModel.js";
import responseHandler from "../../utils/responseHandler.js";
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
            const country = await Country.findByPk(id);
            await country.destroy();
            responseHandler.success(res, "Country deleted successfully", country);
        } catch (error) {
            console.error('Error deleting country:', error);
            responseHandler.error(res, error.message);
        }
    }
}