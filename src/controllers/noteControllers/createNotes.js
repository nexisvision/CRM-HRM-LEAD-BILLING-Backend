import Joi from "joi";
import Note from "../../models/noteModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        body: Joi.object({
            note_title: Joi.string().required(),
            note_type: Joi.string().required(),
            note_employee: Joi.string().required(),
            note_description: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { note_title, note_type, note_employee, note_description } = req.body;
            const note = await Note.create({ note_title, note_type, note_employee, note_description, created_by: req.user?.username });
            return responseHandler.success(res, "Note created successfully", note);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}