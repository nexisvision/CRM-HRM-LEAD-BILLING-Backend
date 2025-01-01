import Joi from "joi";
import Note from "../../models/noteModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            project_id: Joi.string().required(),
        }),
        body: Joi.object({
            note_title: Joi.string().required(),
            note_type: Joi.string().required(),
            note_employee: Joi.object().required(),
            note_description: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { project_id } = req.params;
            const {note_title, note_type, note_employee, note_description } = req.body;
            const note = await Note.create({ project_id: project_id, note_title, note_type, note_employee, note_description, created_by: req.user?.username });
            return responseHandler.success(res, "Note created successfully", note);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}