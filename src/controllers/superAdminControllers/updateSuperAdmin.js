import Joi from "joi";
import bcrypt from "bcrypt";
import SuperAdmin from "../../models/superAdminModel.js";
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
            firstName: Joi.string().optional().allow('', null),
            lastName: Joi.string().optional().allow('', null),
            phone: Joi.string().optional().allow('', null),
            password: Joi.string().optional().allow('', null),
            profilePic: Joi.any(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const profilePic = req.file;
            const { firstName, lastName, phone, password } = req.body;

           

            const superAdmin = await SuperAdmin.findByPk(id);
            if (!superAdmin) {
                return responseHandler.notFound(res, "Super admin not found");
            }

            let profilePicUrl = superAdmin.profilePic;
            if (profilePic) {
                if (superAdmin.profilePic) {
                    const key = decodeURIComponent(superAdmin.profilePic.split(".com/").pop());
                    const s3Params = {
                        Bucket: s3.config.bucketName,
                        Key: key,
                    };
                    await s3.deleteObject(s3Params).promise();
                }
                profilePicUrl = await uploadToS3(profilePic, "super-admin", "profile-pic", superAdmin.username);
            }

            // Handle password update
            let hashedPassword = superAdmin.password;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
              
            }

            await superAdmin.update({
                firstName,
                lastName,
                phone,
                password: hashedPassword,
                profilePic: profilePicUrl,
                updated_by: req.user?.username
            });

            return responseHandler.success(res, "Super admin updated successfully", superAdmin);
        } catch (error) {
            console.error("Update error:", error);
            return responseHandler.error(res, error?.message);
        }
    }
};