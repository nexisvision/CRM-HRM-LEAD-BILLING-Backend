import Joi from "joi";
import User from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import validator from "../../utils/validator.js";
import Employee from "../../models/employeeModel.js";
import SubClient from "../../models/subClientModel.js";
import SuperAdmin from "../../models/superAdminModel.js";
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

            const user = await User.findByPk(id);
            const client = await Client.findByPk(id);
            const employee = await Employee.findByPk(id);
            const subClient = await SubClient.findByPk(id);
            const superAdmin = await SuperAdmin.findByPk(id);

            const foundUser = user || client || employee || subClient || superAdmin;

            if (!foundUser) {
                return responseHandler.notFound(res, "User not found");
            }

            await foundUser.destroy();

            responseHandler.success(res, "User deleted successfully", foundUser);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};