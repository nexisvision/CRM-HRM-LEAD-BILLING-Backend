import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../config/config.js';

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: EMAIL_CONFIG.auth.user,
            to,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Failed to send email');
    }
}; 