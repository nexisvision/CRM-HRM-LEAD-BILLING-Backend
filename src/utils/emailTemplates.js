import { FRONTEND_URL } from '../config/config.js';

const getCommonEmailTemplate = (content) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            font-family: 'Poppins', sans-serif !important;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            color: #2c3e50;
            background-color: #f8f9fa;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            padding: 40px 20px;
            text-align: center;
            background: #ffffff;
        }
        .logo {
            width: 200px;
            height: auto;
            margin: 0 auto;
            display: block;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
        .content {
            padding: 40px;
            background-color: #ffffff;
            border-radius: 12px 12px 0 0;
            margin-top: -20px;
        }
        .title {
            color: #744bcb;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 14px 28px;
            background: #744bcb !important;
            color: #ffffff !important;
            text-decoration: none !important;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            width: 200px;
        }
        .footer {
            text-align: center;
            padding: 30px;
            background-color: #f8f9fa;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-link {
            margin: 0 10px;
            color: #744bcb;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <div class="social-links">
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Instagram</a>
            </div>
            <p> ${new Date().getFullYear()} CRM. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

export const getWelcomeEmailTemplate = (username) => {
    const content = `
        <div class="title">Welcome to CRM, ${username}! 🎉</div>
        <p>Thank you for joining our CRM management platform. We're excited to help you organize and manage your Company's information effectively.</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="margin: 12px 0;">✨ Manage your Company's information easily</div>
            <div style="margin: 12px 0;">🔒 Securely share information with your team</div>
        </div>
        <div class="button-container">
            <a href="${FRONTEND_URL}/login" class="button">Get Started</a>
        </div>
    `;
    return getCommonEmailTemplate(content);
};

export const getPasswordResetEmailTemplate = (username, otp) => {
    const content = `
        <div class="title">Password Reset Request</div>
        <p>Hello ${username}!</p>
        <p>We received a request to reset your password. Here's your OTP:</p>
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #744bcb; letter-spacing: 5px; padding: 10px 20px; background: #f8f9fa; border-radius: 8px;">${otp}</span>
        </div>
        <p style="text-align: center; color: #666;">This OTP will expire in 10 minutes.</p>
        <p style="text-align: center; color: #ff4444; font-size: 14px;">If you didn't request this, please ignore this email.</p>
    `;
    return getCommonEmailTemplate(content);
};

export const getVerificationEmailTemplate = (username, otp) => {
    const content = `
        <div class="title">Verify Your Email</div>
        <p>Hello ${username}!</p>
        <p>Welcome to CRM! Please verify your email with this OTP:</p>
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #744bcb; letter-spacing: 5px; padding: 10px 20px; background: #f8f9fa; border-radius: 8px;">${otp}</span>
        </div>
        <p style="text-align: center; color: #666;">This OTP will expire in 5 minutes.</p>
    `;
    return getCommonEmailTemplate(content);
};

export const getPlanBuyEmailTemplate = (username, plan, billUrl) => {
    const content = `
        <div class="title">Plan Buy Confirmation</div>
        <p>Hello ${username}!</p>
        <p>Congratulations! You have successfully purchased the "${plan.name}" plan.</p>
        <p>Here are the details of your plan:</p>
        <ul style="list-style: none; margin: 20px 0; padding: 0;">
            <li style="margin-bottom: 10px;">• Plan Name: ${plan.name}</li>
            <li style="margin-bottom: 10px;">• Plan Duration: ${plan.duration}</li>
            <li style="margin-bottom: 10px;">• Plan Trial Period: ${plan.trial_period}</li>
            <li style="margin-bottom: 10px;">• Plan Price: ${plan.price}</li>
            <li style="margin-bottom: 10px;">• Number of Users: ${plan.max_users}</li>
            <li style="margin-bottom: 10px;">• Number of Clients: ${plan.max_clients}</li>
            <li style="margin-bottom: 10px;">• Storage Limit: ${plan.storage_limit}</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${billUrl}" 
               style="background-color: #4CAF50; 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 4px;
                      display: inline-block;">
                Download Invoice
            </a>
        </div>
        <p style="text-align: center; color: #666;">If you have any questions or need any help, please don't hesitate to contact us.</p>
    `;
    return getCommonEmailTemplate(content);
};
