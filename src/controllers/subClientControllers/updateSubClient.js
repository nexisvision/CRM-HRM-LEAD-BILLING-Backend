import Joi from "joi";
import SubClient from "../../models/subClientModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            username: Joi.string().min(3).max(30).allow('', null),
            firstName: Joi.string().optional().allow('', null),
            lastName: Joi.string().optional().allow('', null),
            phone: Joi.string().optional().allow('', null),
            profilePic: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, firstName, lastName, phone, profilePic } = req.body;

            const subClient = await SubClient.findByPk(id);
            if (!subClient) {
                return responseHandler.notFound(res, "subClient not found");
            }

            await subClient.update({ username, firstName, lastName, phone, profilePic, updated_by: req.user?.username });
            responseHandler.success(res, "Company updated successfully", subClient);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};