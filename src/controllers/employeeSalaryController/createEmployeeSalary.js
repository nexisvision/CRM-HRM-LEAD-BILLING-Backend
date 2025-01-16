import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import EmployeeSalary from "../../models/employeeSalaryModel.js";

export default {
    validator: validator({
        body: Joi.object({
            employee_id: Joi.string().required(),
            currency: Joi.string().required(),
            annual_CTC: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { employee_id, currency, annual_CTC } = req.body;
            const existingEmployeeSalary = await EmployeeSalary.findOne({ where: { employee_id } });
            if (existingEmployeeSalary) {
                responseHandler.error(res, "Employee salary already exists.");
            }
            const employeeSalary = await EmployeeSalary.create({ employee_id, currency, annual_CTC, created_by: req.user?.username, });
            responseHandler.success(res, "Employee salary created successfully.", employeeSalary);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
