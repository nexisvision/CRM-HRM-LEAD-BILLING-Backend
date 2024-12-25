import Joi from "joi";
import Company from "../../models/companyModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Company ID must be a string',
                'string.empty': 'Company ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const company = await Company.findByPk(id);

            if (!company) {
                return responseHandler.notFound(res, "Company not found");
            }

            responseHandler.success(res, "Company fetched successfully", company);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};