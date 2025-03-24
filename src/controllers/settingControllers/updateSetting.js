import Joi from "joi";
import Setting from "../../models/settingModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import uploadToS3 from "../../utils/uploadToS3.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            termsandconditions: Joi.string().optional(),
            companyName: Joi.string().optional(),
            title: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { termsandconditions, companyName, title } = req.body;
            const logo = req.files?.companylogo?.[0];
            const favicon = req.files?.favicon?.[0];

            // Find existing setting
            const existingSetting = await Setting.findOne({
                where: { id }
            });

            if (!existingSetting) {
                return responseHandler.error(res, "Setting not found");
            }

            // Prepare update object
            const updateData = {
                companyName: companyName || existingSetting.companyName,
                title: title || existingSetting.title,
                termsandconditions: termsandconditions || existingSetting.termsandconditions,
                updated_by: req.user?.username
            };

            // Handle logo upload if provided
            if (logo) {
                const logoUrl = await uploadToS3(
                    logo, 
                    "company-logos", 
                    `logo-${req.user?.id}`, 
                    req.user?.username
                );
                updateData.companylogo = logoUrl;
            }

            // Handle favicon upload if provided
            if (favicon) {
                const faviconUrl = await uploadToS3(
                    favicon, 
                    "company-logos", 
                    `favicon-${req.user?.id}`, 
                    req.user?.username
                );
                updateData.favicon = faviconUrl;
            }

            // Update the setting
            await existingSetting.update(updateData);

            // Fetch updated setting
            const updatedSetting = await Setting.findOne({
                where: { id }
            });

            return responseHandler.success(
                res, 
                "Setting updated successfully", 
                updatedSetting
            );

        } catch (error) {
            console.error("Update Setting Error:", error);
            return responseHandler.error(res, error?.message || "Error updating setting");
        }
    }
}   