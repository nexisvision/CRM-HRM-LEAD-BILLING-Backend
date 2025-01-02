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
            const note = await Note.create({ related_id: id, note_title, note_type, note_employees, note_description, created_by: req.user?.username });
            await Activity.create({
                related_id: id,
                activity_from: "note",
                activity_id: note.id,
                action: "created",
                performed_by: req.user?.username,
                activity_message: `Note ${note.note_title} created successfully`
            });
            return responseHandler.success(res, "Note created successfully", note);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}