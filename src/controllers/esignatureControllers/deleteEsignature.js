import Joi from "joi";
import validator from "../../utils/validator.js";
import ESignature from "../../models/esignatureModel.js";
import responseHandler from "../../utils/responseHandler.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const esignature = await ESignature.findByPk(id);
            if (!esignature) {
                return responseHandler.error(res, "E-signature not found");
            }
            await esignature.destroy();
            return responseHandler.success(res, "E-signature deleted successfully");
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};

