import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import EmployeeSalary from "../../models/employeeSalaryModel.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const employeeSalary = await EmployeeSalary.findAll();
            return responseHandler.success(res, "Employee salary fetched successfully.", employeeSalary);
        } catch (error) {
            return responseHandler.error(res, error.message);
        }
    }
}