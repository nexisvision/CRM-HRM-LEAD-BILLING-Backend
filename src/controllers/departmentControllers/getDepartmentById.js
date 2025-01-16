import Joi from "joi";
import Department from "../../models/departmentModel.js";
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
            const department = await Department.findByPk(id);
            if (!department) {
                responseHandler.error(res, "Department not found");
            }
            responseHandler.success(res, "Department fetched successfully", department);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}   