import Email from "../../models/emailModel.js";
import { sendEmail } from "../../utils/emailService.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    sendEmail: async (req, res) => {
        try {
            const { to, subject, html } = req.body;
            const email = await sendEmail(to, subject, html);
            return responseHandler.success(res, 'Email sent successfully', email);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    },
    getEmails: async (req, res) => {
        try {
            const emails = await Email.findAll();
            return responseHandler.success(res, 'Emails fetched successfully', emails);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
