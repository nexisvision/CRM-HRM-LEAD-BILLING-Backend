import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import User from "../../models/userModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            username: Joi.string().min(3).max(30).allow('', null),
            email: Joi.string().email().allow('', null),
            firstName: Joi.string().optional().allow('', null),
            lastName: Joi.string().optional().allow('', null),
            phone: Joi.string().optional().allow('', null),
            profilePic: Joi.string().optional().allow('', null),
            bankname: Joi.string().optional().allow('', null),
            ifsc: Joi.string().optional().allow('', null),
            banklocation: Joi.string().optional().allow('', null),
            accountholder: Joi.string().optional().allow('', null),
            accountnumber: Joi.number().optional().allow('', null),
            e_signature: Joi.string().optional().allow('', null),
            gstIn: Joi.string().optional().allow('', null),
            city: Joi.string().optional().allow('', null),
            state: Joi.string().optional().allow('', null),
            country: Joi.string().optional().allow('', null),
            zipcode: Joi.string().optional().allow('', null),
            address: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email, firstName, lastName, phone, profilePic,
                bankname, ifsc, banklocation, accountholder, accountnumber, e_signature, gstIn,
                city, state, country, zipcode, address } = req.body;

            const client = await User.findByPk(id);
            if (!client) {
                return responseHandler.notFound(res, "Client not found");
            }

            await client.update({
                username, email, firstName, lastName,
                phone, profilePic, bankname, ifsc, banklocation, accountholder, accountnumber, e_signature, gstIn,
                city, state, country, zipcode, address, updated_by: req.user?.username
            });
            return responseHandler.success(res, "Client updated successfully", client);
        } catch (error) {

            return responseHandler.error(res, error);
        }
    }
};