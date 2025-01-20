import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import OfferLetter from "../../models/offerletter.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const offerletters = await OfferLetter.findAll();
            if (!offerletters) {
                return responseHandler.error(res, "No offer letters found");
            }
            return responseHandler.success(res, "Offer letters fetched successfully", offerletters);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}