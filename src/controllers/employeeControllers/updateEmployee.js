import Joi from "joi";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            firstName: Joi.string().allow('', null),
            lastName: Joi.string().allow('', null),
            username: Joi.string().allow('', null),
            phone: Joi.string().allow('', null),
            address: Joi.string().allow('', null),
            joiningDate: Joi.date().allow('', null),
            leaveDate: Joi.date().allow(null),
            department: Joi.string().allow('', null),
            designation: Joi.string().allow('', null),
            salary: Joi.number().allow('', null),
            accountholder: Joi.string().allow('', null),
            accountnumber: Joi.number().allow('', null),
            bankname: Joi.string().allow('', null),
            ifsc: Joi.number().allow('', null),
            banklocation: Joi.string().allow('', null),
            e_signatures: Joi.object().optional().allow(null),
            documents: Joi.object().optional().allow(null),
            links: Joi.object().optional().allow(null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { firstName, lastName, username, phone, address, joiningDate, leaveDate, department, designation, salary, accountholder, accountnumber, bankname, ifsc, banklocation, e_signatures, documents, links } = req.body;

            const employee = await User.findByPk(id);
            if (!employee) {
                return responseHandler.notFound(res, "Employee not found");
            }

            const existingPhone = await User.findOne({ where: { phone } });
            if (existingPhone) {
                return responseHandler.conflict(res, "Phone number already exists");
            }

            await employee.update({
                firstName,
                lastName,
                username,
                phone,
                address,
                joiningDate,
                leaveDate,
                department,
                designation,
                salary,
                accountholder,
                accountnumber,
                bankname,
                ifsc,
                banklocation,
                e_signatures,
                documents,
                links,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Employee updated successfully", employee);
        } catch (error) {
            return responseHandler.error(res, error);
        }
    }
};