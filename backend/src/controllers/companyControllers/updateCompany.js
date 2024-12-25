import Joi from "joi";
import Company from "../../models/companyModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().min(3).max(30),
            email: Joi.string().email(),
            phone: Joi.string().min(10).max(15),
            address: Joi.string().min(3).max(100),
            role_id: Joi.string()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, phone, address, role_id } = req.body;

            const company = await Company.findByPk(id);
            if (!company) {
                return responseHandler.notFound(res, "Company not found");
            }

            await company.update({ name, email, phone, address, role_id });
            responseHandler.success(res, "Company updated successfully", company);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
};