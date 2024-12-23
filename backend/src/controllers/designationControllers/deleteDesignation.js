import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import Designation from "../../models/designationModel.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Designation ID must be a string',
                'string.empty': 'Designation ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const designation = await Designation.findByPk(id);

            if (!designation) {
                return responseHandler.notFound(res, "Designation not found");
            }

            await designation.destroy();

            responseHandler.success(res, "Designation deleted successfully");
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};   