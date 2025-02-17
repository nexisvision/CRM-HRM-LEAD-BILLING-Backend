import Joi from "joi";
import Setting from "../../models/settingModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import uploadToS3 from "../../utils/uploadToS3.js";

export default {
    validator: validator({
        body: Joi.object({
            termsandconditions: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { termsandconditions } = req.body;
            const logo = req.files?.companylogo?.[0];

            if (!logo) {
                return responseHandler.error(res, "Company logo is required");
            }

            // Upload logo to S3
            const logoUrl = await uploadToS3(logo, "company-logos", `logo-${req.user?.id}`, req.user?.username);

            const setting = await Setting.create({
                companylogo: logoUrl,
                termsandconditions,
                client_id: req.user?.id,
                created_by: req.user?.username
            });

            return responseHandler.success(res, "Setting created successfully", setting);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}   