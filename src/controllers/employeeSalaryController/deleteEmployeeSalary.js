import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import EmployeeSalary from "../../models/employeeSalaryModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const employeeSalary = await EmployeeSalary.findByPk(id);
            if (!employeeSalary) {
                responseHandler.notFound(res, "EmployeeSalary not found");
            }

            await employeeSalary.destroy();
            responseHandler.success(res, "EmployeeSalary deleted successfully", employeeSalary);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
