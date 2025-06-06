import Joi from "joi";
import Ticket from "../../models/ticketModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";
import uploadToS3 from "../../utils/uploadToS3.js";
import { s3 } from "../../config/config.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            requestor: Joi.string().required(),
            assignGroup: Joi.string().optional(),
            agent: Joi.string().allow(null),
            project: Joi.string().allow(null),
            type: Joi.string().allow(null),
            endDate: Joi.string().allow(null),
            ticketSubject: Joi.string().required(),
            description: Joi.string().required(),
            priority: Joi.string().allow(null),
            status: Joi.string().allow(null),
            channelName: Joi.string().allow(null),
            tag: Joi.string().allow(null),
        })
    }),
    handler: async (req, res) => {
        try {
            const file = req.file;
            const { id } = req.params;
            const { requestor, assignGroup, agent, status, project, type, endDate, ticketSubject, description, priority, channelName, tag } = req.body;
            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return responseHandler.error(res, "Ticket not found");
            }
            const existingTicket = await Ticket.findOne({ where: { ticketSubject, id: { [Op.not]: id } } });
            if (existingTicket) {
                return responseHandler.error(res, "Ticket already exists");
            }
            let fileUrl = ticket.file;
            if (file) {
                if (ticket.file) {
                    const key = decodeURIComponent(ticket.file.split(".com/").pop());
                    const s3Params = {
                        Bucket: s3.config.bucketName,
                        Key: key,
                    };
                    // await s3.deleteObject(s3Params).promise();
                }
                fileUrl = await uploadToS3(file, req.user?.roleName, "support-ticket", req.user?.username, req.user?.created_by);
            }
            await ticket.update({ requestor, assignGroup, status, agent, project, type, endDate, ticketSubject, description, priority, channelName, tag, file: fileUrl, updated_by: req.user?.username });
            return responseHandler.success(res, "Ticket updated successfully", ticket);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}