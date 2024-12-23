import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const TIMEZONE = process.env.TIMEZONE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;
export const SUPER_ADMIN_SECRET_KEY = process.env.SUPER_ADMIN_SECRET_KEY;
