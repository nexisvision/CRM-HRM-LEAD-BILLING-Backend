import LeadUser from "../../../models/dealandleadUserModel.js";
import responseHandler from "../../../utils/responseHandler.js";
import Lead from "../../../models/leadModel.js";
import Joi from "joi";
import validator from "../../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            leadId: Joi.string().required(),
            employeeId: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        const { leadId, employeeId } = req.params;
        try {
            const lead = await Lead.findByPk(leadId);
            if (!lead) {
                return responseHandler.notFound(res, "Lead not found");
            }
            const leadUser = await LeadUser.findOne({
                where: {
                    id: employeeId,
                    leadId: leadId
                }
            });
            if (!leadUser) {
                return responseHandler.notFound(res, "Lead user not found");
            }
            await leadUser.destroy();
            responseHandler.success(res, "Lead user deleted successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}