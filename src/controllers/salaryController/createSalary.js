import Joi from "joi";
import Salary from "../../models/SalaryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        body: Joi.object({
            payslipType: Joi.string().required(),
            currency: Joi.string().required(),
            netSalary: Joi.string().required(),
            salary: Joi.string().required(),
            bankAccount: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { payslipType, currency, netSalary, salary, bankAccount } = req.body;
            const EMP = await User.findOne({ where: { id: req.user?.id } });
            if (!EMP) {
                return responseHandler.error(res, "Employee not found");
            }
            const existingSalary = await Salary.findOne({ where: { employeeId: EMP.employeeId } });
            if (existingSalary) {
                return responseHandler.error(res, "Salary already exists");
            }
            const salaryType = await Salary.create({
                employeeId: EMP.employeeId,
                payslipType,
                currency,
                netSalary,
                salary,
                bankAccount,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Salary created successfully", salaryType);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}