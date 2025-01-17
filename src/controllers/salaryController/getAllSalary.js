import Joi from "joi";
import Salary from "../../models/SalaryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const salary = await Salary.findAll();
            if (!salary) {
                return responseHandler.error(res, "Salary not found");
            }
            return responseHandler.success(res, "Salary fetched successfully", salary);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}