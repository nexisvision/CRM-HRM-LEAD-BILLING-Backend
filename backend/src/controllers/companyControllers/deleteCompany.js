import Joi from "joi";
import Company from "../../models/companyModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

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
                return responseHandler.error(res, "Company not found");
            }

            await company.destroy();
            return responseHandler.success(res, "Company deleted successfully", company);
        } catch (error) {
            return responseHandler.error(res, error.errors[0].message);
        }
    }
}