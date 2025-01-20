import Joi from "joi";
import Currency from "../../models/currencyModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            currencyName: Joi.string().required(),
            currencyIcon: Joi.string().required(),
            currencyCode: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { currencyName, currencyIcon, currencyCode } = req.body;

            const existingCurrency = await Currency.findOne({ where: { currencyName } });
            if (existingCurrency) {
                return responseHandler.error(res, "Currency already exists");
            }

            const currency = await Currency.create({
                currencyName,
                currencyIcon,
                currencyCode,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Currency created successfully", currency);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
