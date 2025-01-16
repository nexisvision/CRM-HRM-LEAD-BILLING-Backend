import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import EmployeeSalary from "../../models/employeeSalaryModel.js";

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
            const existingEmployeeSalary = await EmployeeSalary.findByPk(id);
            if (!existingEmployeeSalary) {
                return responseHandler.error(res, "Employee salary record not found.");
            }

            // Update the record
            await EmployeeSalary.update(
                { employee_id, currency, annual_CTC, updated_by: req.user?.username },
                { where: { id } } // Include the where clause
            );
            return responseHandler.success(res, "Employee salary created successfully.", existingEmployeeSalary);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}
