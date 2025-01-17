import Joi from "joi";
import LeaveType from "../../models/leaveTypeModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            leaveType: Joi.string().required(),
            daysPerYear: Joi.number().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { leaveType, daysPerYear } = req.body;
            const leaveTypeToUpdate = await LeaveType.findByPk(id);
            if (!leaveTypeToUpdate) {
                return responseHandler.error(res, "Leave type not found");
            }
            const existingLeaveType = await LeaveType.findOne({ where: { name } });
            if (existingLeaveType) {
                return responseHandler.error(res, "Leave type already exists");
            }
            await leaveTypeToUpdate.update({ leaveType, daysPerYear, updated_by: req.user?.username });
            return responseHandler.success(res, "Leave type updated successfully", leaveTypeToUpdate);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}