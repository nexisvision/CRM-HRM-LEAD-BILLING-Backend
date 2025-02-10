import Joi from "joi";
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
            username: Joi.string().min(3).max(30).allow('', null),
            firstName: Joi.string().optional().allow('', null),
            lastName: Joi.string().optional().allow('', null),
            phone: Joi.string().optional().allow('', null),
            profilePic: Joi.any().optional().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const profilePic = req.file;
            const { username, firstName, lastName, phone } = req.body;

            const superAdmin = await SuperAdmin.findByPk(id);
            if (!superAdmin) {
                return responseHandler.notFound(res, "Super admin not found");
            }

            const existingSuperAdmin = await SuperAdmin.findOne({ where: { username, id: { [Op.not]: id } } });
            if (existingSuperAdmin) {
                return responseHandler.error(res, "Username already exists");
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
            await superAdmin.update({ username, firstName, lastName, phone, profilePic: profilePicUrl, updated_by: req.user?.username });
            return responseHandler.success(res, "Super admin updated successfully", superAdmin);
        } catch (error) {

            return responseHandler.error(res, error?.message);
        }
    }
};