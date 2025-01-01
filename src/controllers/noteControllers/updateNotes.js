import Joi from "joi";
import Note from "../../models/noteModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
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
            const { id } = req.params;
            const { note_title, note_type, note_employee, note_description } = req.body;
            const note = await Note.findByPk(id);
            if (!note) {
                return responseHandler.error(res, "Note not found");
            }
            await note.update({ note_title, note_type, note_employee, note_description, updated_by: req.user?.username });
            return responseHandler.success(res, "Note updated successfully", note);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}