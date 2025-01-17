import Joi from "joi";
import validator from "../../utils/validator.js";
import OverTime from "../../models/overTimeModel.js";
import responseHandler from "../../utils/responseHandler.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        body: Joi.object({
            title: Joi.string().required(),
            days: Joi.number().required(),
            Hours: Joi.number().required(),
            rate: Joi.number().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { title, days, Hours, rate } = req.body;
            const EMP = await User.findOne({ where: { id: req.user?.id } });
            if (!EMP) {
                return responseHandler.error(res, "Employee not found");
            }
            const existingOverTime = await OverTime.findOne({ where: { employeeId: EMP.employeeId } });
            if (existingOverTime) {
                return responseHandler.error(res, "OverTime already exists");
            }
            const overTime = await OverTime.create({ employeeId: EMP.employeeId, title, days, Hours, rate, created_by: req.user?.username });
            return responseHandler.success(res, "OverTime created successfully", overTime);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}


