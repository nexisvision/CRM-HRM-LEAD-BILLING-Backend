import DealUser from "../../../models/dealandleadUserModel.js";
import responseHandler from "../../../utils/responseHandler.js";
import Deal from "../../../models/dealModel.js";
import Joi from "joi";
import validator from "../../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            dealId: Joi.string().required(),
            employeeId: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        const { dealId, employeeId } = req.params;
        try {
            const deal = await Deal.findByPk(dealId);
            if (!deal) {
                return responseHandler.notFound(res, "Deal not found");
            }
            const dealUser = await DealUser.findOne({
                where: {
                    id: employeeId,
                    dealId: dealId
                }
            });
            if (!dealUser) {
                return responseHandler.notFound(res, "Deal user not found");
            }
            await dealUser.destroy();
            responseHandler.success(res, "Deal user deleted successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.errors[0].message);
        }
    }
}