import Joi from "joi";
import validator from "../../utils/validator.js";
import ESignature from "../../models/esignatureModel.js";
import responseHandler from "../../utils/responseHandler.js";
export default {
    validator: validator({
        query: Joi.object({
            // user_id: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            // const { user_id } = req.query;
            // const where = user_id ? { user_id } : {};
            
            const esignatures = await ESignature.findAll();
            return responseHandler.success(res, "E-signatures fetched successfully", esignatures);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}; 