import Joi from "joi";
import Salary from "../../models/SalaryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            employeeId: Joi.string().required(),
            payslipType: Joi.string().required(),
            currency: Joi.string().required(),
            netSalary: Joi.string().required(),
            salary: Joi.string().required(),
            bankAccount: Joi.string().required(),
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