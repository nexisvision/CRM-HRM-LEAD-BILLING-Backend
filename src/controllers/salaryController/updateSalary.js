import Joi from "joi";
import Salary from "../../models/SalaryModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            status: Joi.string().required().allow('paid'),
            paymentDate: Joi.date().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { status, paymentDate } = req.body;
            const salaryData = await Salary.findByPk(id);
            if (!salaryData) {
                return responseHandler.error(res, "Salary not found");
            }
            const existingSalary = await Salary.findOne({ where: { employeeId: salaryData.employeeId, id: { [Op.not]: id } } });
            if (existingSalary) {
                return responseHandler.error(res, "Salary already exists");
            }
            await salaryData.update({
                status,
                paymentDate,
                updated_by: req.user?.username
            });
            return responseHandler.success(res, "Salary updated successfully", salaryData);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}