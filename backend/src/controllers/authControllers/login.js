import Joi from "joi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import { JWT_SECRET } from "../../config/config.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        body: Joi.object({
            login: Joi.string().required(),
            password: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { login, password } = req.body;

            // Find user and client simultaneously
            const [user, client] = await Promise.all([
                User.findOne({
                    where: {
                        [Op.or]: [
                            { email: login },
                            { username: login }
                        ]
                    }
                }),
                Client.findOne({
                    where: {
                        [Op.or]: [
                            { email: login },
                            { username: login }
                        ]
                    }
                })
            ]);

            // If neither user nor client found
            if (!user && !client) {
                return responseHandler.error(res, "Account not found");
            }

            // Check user credentials if user exists
            if (user) {
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { userId: user.id, email: user.email, role_id: user.role_id },
                        JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                    return responseHandler.success(res, "Login successful", { token, user });
                }
            }

            // Check client credentials if client exists
            if (client) {
                const isPasswordCorrect = await bcrypt.compare(password, client.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { clientId: client.id, email: client.email, role: 'client' },
                        JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                    return responseHandler.success(res, "Login successful", { token, client });
                }
            }

            // If we reach here, password was incorrect for both accounts
            return responseHandler.error(res, "Invalid password");

        } catch (error) {
            return responseHandler.error(res, "An error occurred during login");
        }
    }
}
