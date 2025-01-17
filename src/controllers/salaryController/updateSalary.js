import Joi from "joi";
import Salary from "../../models/SalaryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            status: Joi.string().required().allow('paid'),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const salaryData = await Salary.findByPk(id);
            if (!salaryData) {
                return responseHandler.error(res, "Salary not found");
            }
            await salaryData.update({
                status,
                updated_by: req.user?.username
            });
            return responseHandler.success(res, "Salary updated successfully", salaryData);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}