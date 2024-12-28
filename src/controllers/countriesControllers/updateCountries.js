// import Country from "../../models/countriesModel.js";
// import validator from "../../utils/validator.js";
// import Joi from "joi";

// export default {
//     validator: validator,
//     params: Joi.object({
//         id: Joi.string().required().messages({
//             'string.base': 'Id must be a string',
//             'string.empty': 'Id is required'
//         })
//     }),
//     body: Joi.object({
//         countryName: Joi.string().required().messages({
//             'string.base': 'Country name must be a string',
//             'string.empty': 'Country name is required'
//         }),
//         countryCode: Joi.string().required().messages({
//             'string.base': 'Country code must be a string',
//             'string.empty': 'Country code is required'
//         }),
//         phoneCode: Joi.string().required().messages({
//             'string.base': 'Phone code must be a string',
//             'string.empty': 'Phone code is required'
//         })
//     }),

// handler: async (req, res) => {
//     try {   
//         const { id } = req.params;
//         const { countryName, countryCode, phoneCode } = req.body;
//         const country = await Country.findByPk(id);
//         await country.update({ countryName, countryCode, phoneCode });
//         res.status(200).json({ message: "Country updated successfully" });
//     } catch (error) {
//             console.error('Error updating country:', error);
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }
// }   
