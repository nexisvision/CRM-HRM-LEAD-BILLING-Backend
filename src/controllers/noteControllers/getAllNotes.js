import Note from "../../models/noteModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            project_id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { project_id } = req.params;
            const notes = await Note.findAll({ where: { project_id } });
            return responseHandler.success(res, "Notes fetched successfully", notes);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}