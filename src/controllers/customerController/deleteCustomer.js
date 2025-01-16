import Joi from "joi";
import Customer from "../../models/customersModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);
            if (!customer) {
                responseHandler.error(res, "customer not found");
            }
            await customer.destroy();
            responseHandler.success(res, "customer deleted successfully", customer);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}