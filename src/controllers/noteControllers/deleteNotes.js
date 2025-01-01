import Joi from "joi";
import Note from "../../models/noteModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const note = await Note.findByPk(id);
            if (!note) {
                return responseHandler.error (res, "Note not found");
            }
            await note.destroy();
            return responseHandler.success(res, "Note deleted successfully", note);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}