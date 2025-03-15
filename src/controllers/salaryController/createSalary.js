import Joi from "joi";
import Salary from "../../models/SalaryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            employeeId: Joi.string().optional(),
            payslipType: Joi.string().optional(),
            currency: Joi.string().optional(),
            netSalary: Joi.string().optional(),
            salary: Joi.number().optional(),
            bankAccount: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const {employeeId, payslipType, currency, netSalary, salary, bankAccount, status } = req.body;
            const existingSalary = await Salary.findOne({ where: { employeeId } });
            if (existingSalary) {
                return responseHandler.error(res, "Salary already exists");
            }
            const salaryType = await Salary.create({
                employeeId,
                payslipType,
                currency,
                netSalary,
                salary,
                bankAccount,
                status,
                paymentDate: status === 'paid' ? new Date() : null,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Salary created successfully", salaryType);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}