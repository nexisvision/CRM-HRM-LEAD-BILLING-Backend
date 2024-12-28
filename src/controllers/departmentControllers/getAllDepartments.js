import Joi from "joi";
import Department from "../../models/departmentModel.js";
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
            const departments = await Department.findAll();
            responseHandler.success(res, "Departments fetched successfully", departments);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }

}

