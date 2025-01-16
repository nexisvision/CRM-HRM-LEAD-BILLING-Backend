import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const employee = await User.findByPk(id);
            if (!employee) {
                responseHandler.notFound(res, "Employee not found");
            }

            await employee.destroy();
            responseHandler.success(res, "Employee deleted successfully", employee);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
