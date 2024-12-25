import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import Employee from "../../models/employeeModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        body: Joi.object({
            employee_id: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            leaveType: Joi.string().valid('sick', 'casual', 'annual', 'other').required(),
            reason: Joi.string().required(),
            status: Joi.string().valid('pending', 'approved', 'rejected').default('pending')
        })
    }),
    handler: async (req, res) => {
        try {
            const { employee_id, startDate, endDate, leaveType, reason, status } = req.body;

            // Check if user exists
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                return responseHandler.notFound(res, "Employee not found");
            }

            // Check for overlapping leaves
            const overlappingLeave = await Leave.findOne({
                where: {
                    employee_id,
                    [Op.or]: [
                        {
                            startDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        {
                            endDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        }
                    ]
                }
            });

            if (overlappingLeave) {
                return responseHandler.error(res, "Leave already exists for these dates");
            }
            const leave = await Leave.create({
                employee_id,
                startDate,
                endDate,
                leaveType,
                reason,
                status,
                created_by: req.user?.id
            });

            responseHandler.created(res, "Leave request created successfully", leave);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
