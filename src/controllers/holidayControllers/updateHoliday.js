import Joi from "joi";
import Holiday from "../../models/holidayModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            holiday_name: Joi.string().optional(),
            start_date: Joi.date().optional(),
            end_date: Joi.date().optional(),
            leave_type: Joi.string().valid('paid', 'unpaid').optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { holiday_name, start_date, end_date, leave_type } = req.body;

            const holiday = await Holiday.findByPk(id);
            if (!holiday) {
                return responseHandler.error(res, "Holiday not found");
            }

            const existingHoliday = await Holiday.findOne({ where: { holiday_name, id: { [Op.not]: id } } });
            if (existingHoliday) {
                return responseHandler.error(res, "Holiday with this name already exists");
            }

            await holiday.update({
                holiday_name,
                start_date,
                end_date,
                leave_type,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Holiday updated successfully", holiday);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}