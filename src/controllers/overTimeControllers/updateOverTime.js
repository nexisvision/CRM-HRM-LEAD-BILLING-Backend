import Joi from "joi";
import validator from "../../utils/validator.js";
import OverTime from "../../models/overTimeModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            title: Joi.string().required(),
            days: Joi.number().required(),
            Hours: Joi.number().required(),
            rate: Joi.number().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, days, Hours, rate } = req.body;
            const overTime = await OverTime.findByPk(id);
            if (!overTime) {
                return responseHandler.notFound(res, 'OverTime not found');
            }
            const updatedOverTime = await overTime.update({ title, days, Hours, rate, updated_by: req.user?.username });
            return responseHandler.success(res, 'OverTime updated successfully', updatedOverTime);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
}