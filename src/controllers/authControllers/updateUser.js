import Joi from "joi";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import { Op } from "sequelize";
import { s3 } from "../../config/config.js";
import uploadToS3 from "../../utils/uploadToS3.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            firstName: Joi.string().allow('', null),
            lastName: Joi.string().allow('', null),
            username: Joi.string().allow('', null),
            phone: Joi.string().allow('', null),
            address: Joi.string().allow('', null),
            joiningDate: Joi.date().allow('', null),
            leaveDate: Joi.date().allow(null),
            department: Joi.string().allow('', null),
            state: Joi.string().allow('', null),
            country: Joi.string().allow('', null),
            zipcode: Joi.number().allow('', null),
            city: Joi.string().allow('', null),

            role_id: Joi.string().allow('', null),
            designation: Joi.string().allow('', null),
            salary: Joi.number().allow('', null),
            accountholder: Joi.string().allow('', null),
            accountnumber: Joi.number().allow('', null),
            bankname: Joi.string().allow('', null),
            ifsc: Joi.number().allow('', null),
            banklocation: Joi.string().allow('', null),
            e_signatures: Joi.object().optional().allow(null),
            links: Joi.object().optional().allow(null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const profilePic = req.files?.profilePic?.[0];
            const { firstName, lastName, username, phone, address, joiningDate, leaveDate, department, designation, salary, accountholder, accountnumber, bankname, ifsc, banklocation, e_signatures, links, role_id, state, country, zipcode, city } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const existingUser = await User.findOne({ where: { username, id: { [Op.not]: id } } });
            if (existingUser) {
                return responseHandler.error(res, "User already exists");
            }

            // Handle profile picture upload
            let profilePicUrl = user.profilePic;
            if (profilePic) {
                // Delete old profile picture if it exists
                if (user.profilePic) {
                    const key = decodeURIComponent(user.profilePic.split(".com/").pop());
                    const s3Params = {
                        Bucket: s3.config.bucketName,
                        Key: key,
                    };
                    try {
                        await s3.deleteObject(s3Params).promise();
                    } catch (error) {
                        console.error('Error deleting old profile pic:', error);
                    }
                }
                // Upload new profile picture
                profilePicUrl = await uploadToS3(profilePic, "user", "profile-pic", user.username);
            }

            await user.update({ firstName, lastName, username, phone, address, joiningDate, leaveDate, role_id, department, designation, salary, accountholder, accountnumber, bankname, state, country, zipcode, city, ifsc, banklocation, e_signatures, links, profilePic: profilePicUrl, updated_by: req.user?.username });

            return responseHandler.success(res, "User updated successfully", user);
        } catch (error) {
            console.error("Update user error:", error);
            return responseHandler.error(res, error?.message || "Failed to update user");
        }
    }
};