import Joi from "joi";
import Note from "../../models/noteModel.js";
import Activity from "../../models/activityModel.js";
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
            note_employees: Joi.object().optional().allow('', null),
            note_description: Joi.string().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { note_title, note_type, note_employees, note_description } = req.body;
            const note = await Note.findByPk(id);
            if (!note) {
                return responseHandler.error(res, "Note not found");
            }
            await note.update({ note_title, note_type, note_employees, note_description, updated_by: req.user?.username });
            await Activity.create({
                related_id: note.related_id,
                activity_from: "note",
                activity_id: note.id,
                action: "updated",
                performed_by: req.user?.username,
                activity_message: `Note ${note.note_title} updated successfully`
            });
            return responseHandler.success(res, "Note updated successfully", note);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}