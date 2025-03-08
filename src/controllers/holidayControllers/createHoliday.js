import Joi from "joi";
import Holiday from "../../models/holidayModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            holiday_name: Joi.string().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().required(),
            leave_type: Joi.string().valid('paid', 'unpaid').required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { holiday_name, start_date, end_date, leave_type } = req.body;
            const existingHoliday = await Holiday.findOne({ where: { holiday_name } });
            if (existingHoliday) {
                return responseHandler.error(res, 'Holiday already exists');
            }
            const holiday = await Holiday.create({
                holiday_name,
                start_date,
                end_date,
                leave_type,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });
            return responseHandler.success(res, 'Holiday created successfully', holiday);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}