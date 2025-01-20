import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import EmployeeSalary from "../../models/employeeSalaryModel.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            employee_id: Joi.string().required(),
            currency: Joi.string().required(),
            annual_CTC: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { employee_id, currency, annual_CTC } = req.body;
            const employeeSalary = await EmployeeSalary.findByPk(id);
            if (!employeeSalary) {
                return responseHandler.error(res, "Employee salary record not found.");
            }

            const existingEmployeeSalary = await EmployeeSalary.findOne({ where: { employee_id, id: { [Op.not]: id } } });
            if (existingEmployeeSalary) {
                return responseHandler.error(res, "Employee salary already exists.");
            }

            await employeeSalary.update({ employee_id, currency, annual_CTC, updated_by: req.user?.username });
            return responseHandler.success(res, "Employee salary updated successfully.", employeeSalary);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
