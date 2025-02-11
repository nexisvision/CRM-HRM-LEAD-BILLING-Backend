import Joi from "joi";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import User from "../../models/userModel.js";
import { s3 } from "../../config/config.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;

            const client = await User.findByPk(id);
            if (!client) {
                return responseHandler.error(res, "Client not found");
            }

            if (client.profilePic) {
                const key = decodeURIComponent(client.profilePic.split(".com/").pop());
                const s3Params = {
                    Bucket: s3.config.bucketName,
                    Key: key,
                };
                await s3.deleteObject(s3Params).promise();
            }

            if (client.e_signatures) {
                const key = decodeURIComponent(client.e_signatures.split(".com/").pop());
                const s3Params = {
                    Bucket: s3.config.bucketName,
                    Key: key,
                };
                await s3.deleteObject(s3Params).promise();
            }

            await client.destroy();
            return responseHandler.success(res, "Client deleted successfully", client);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}