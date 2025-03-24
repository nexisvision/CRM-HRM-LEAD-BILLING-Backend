import Joi from "joi";
import Setting from "../../models/settingModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import uploadToS3 from "../../utils/uploadToS3.js";

export default {
    validator: validator({
        body: Joi.object({
            termsandconditions: Joi.string().optional(),
            companyName: Joi.string().optional(),
            title: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { termsandconditions, companyName, title } = req.body;
            const logo = req.files?.companylogo?.[0];
            const favicon = req.files?.favicon?.[0];

            if (!logo) {
                return responseHandler.error(res, "Company logo is required");
            }
            if (!favicon) {
                return responseHandler.error(res, "Favicon is required");
            }


            // Upload logo to S3
            const logoUrl = await uploadToS3(logo, "company-logos", `logo-${req.user?.id}`, req.user?.username);
            const faviconUrl = await uploadToS3(favicon, "company-logos", `favicon-${req.user?.id}`, req.user?.username);

            const setting = await Setting.create({
                companylogo: logoUrl,
                favicon: faviconUrl,
                companyName,
                title,
                termsandconditions,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Setting created successfully", setting);
        } catch (error) {
            console.log(error);
            return responseHandler.error(res, error?.message);
        }
    }
}   