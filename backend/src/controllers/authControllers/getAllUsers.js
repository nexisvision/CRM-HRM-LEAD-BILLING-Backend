import Joi from "joi";
import User from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import validator from "../../utils/validator.js";
import Employee from "../../models/employeeModel.js";
import Company from "../../models/companyModel.js";
import SuperAdmin from "../../models/superAdminModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const users = await User.findAll();
            const clients = await Client.findAll();
            const employees = await Employee.findAll();
            const companies = await Company.findAll();
            const superAdmins = await SuperAdmin.findAll();

            const allUsers = [...users, ...clients, ...employees, ...companies, ...superAdmins];

            responseHandler.success(res, "Users fetched successfully", allUsers);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
