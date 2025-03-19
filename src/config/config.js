import dotenv from "dotenv";
import AWS from "aws-sdk";
import path from "path";

// Determine which .env file to load based on NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`Using environment file: ${envFile}`); // Debugging log

export const PORT = process.env.PORT;
export const DB_NAME = process.env.DB_NAME;
console.log("Database Name:", process.env.DB_NAME);

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const TIMEZONE = process.env.TIMEZONE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;
export const SUPER_ADMIN_SECRET_KEY = process.env.SUPER_ADMIN_SECRET_KEY;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const OTP_CONFIG = {
    LENGTH: 6,
    EXPIRY: {
        DEFAULT: 5 * 60 * 1000, // 5 minutes
        RESET_PASSWORD: 10 * 60 * 1000 // 10 minutes
    }
};

export const EMAIL_CONFIG = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
};

export const UPLOAD_CONFIG = {
    MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
    ALLOWED_FILE_TYPES: {
        IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
        DOCUMENT: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain'
        ]
    },
    MAX_FILES_PER_MESSAGE: 5
};

export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME
});






// import dotenv from "dotenv";
// import AWS from "aws-sdk";

// dotenv.config();

// export const PORT = process.env.PORT;
// export const DB_NAME = process.env.DB_NAME;
// export const DB_USER = process.env.DB_USER;
// export const DB_PASSWORD = process.env.DB_PASSWORD;
// export const DB_HOST = process.env.DB_HOST;
// export const TIMEZONE = process.env.TIMEZONE;
// export const JWT_SECRET = process.env.JWT_SECRET;
// export const CLIENT_URL = process.env.CLIENT_URL;
// export const SUPER_ADMIN_SECRET_KEY = process.env.SUPER_ADMIN_SECRET_KEY;
// export const FRONTEND_URL = process.env.FRONTEND_URL;

// export const OTP_CONFIG = {
//     LENGTH: 6,
//     EXPIRY: {
//         DEFAULT: 5 * 60 * 1000, // 5 minutes
//         RESET_PASSWORD: 10 * 60 * 1000 // 10 minutes
//     }
// };

// export const EMAIL_CONFIG = {
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//     }
// };

// export const UPLOAD_CONFIG = {
//     MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
//     ALLOWED_FILE_TYPES: {
//         IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
//         VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
//         DOCUMENT: [
//             'application/pdf',
//             'application/msword',
//             'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//             'application/vnd.ms-excel',
//             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//             'text/plain'
//         ]
//     },
//     MAX_FILES_PER_MESSAGE: 5
// };

// export const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//     bucketName: process.env.AWS_BUCKET_NAME
// });