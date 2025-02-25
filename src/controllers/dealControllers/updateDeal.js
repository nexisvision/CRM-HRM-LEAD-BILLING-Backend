import Joi from "joi";
import Deal from "../../models/dealModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().optional()
        }),
        body: Joi.object({
            leadTitle: Joi.string().allow('', null),
            dealName: Joi.string().allow('', null),
            pipeline: Joi.string().allow('', null),
            stage: Joi.string().allow('', null),
            price: Joi.number().optional(),
            currency: Joi.string().allow('', null),
            closedDate: Joi.date().optional(),
            project: Joi.string().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const deal = await Deal.findByPk(id);
            if (!deal) {
                return responseHandler.notFound(res, "Deal not found");
            }
            await deal.update({ ...updateData, updated_by: req.user?.username });
            return responseHandler.success(res, "Deal updated successfully", deal);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}