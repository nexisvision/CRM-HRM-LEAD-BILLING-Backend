import Joi from "joi";
import Customer from "../../models/customersModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {

            const customers = await Customer.findAll();
            if (!customers) {
                return responseHandler.error(res, "No customers found");
            }
            return responseHandler.success(res, "Customers fetched successfully", customers);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}