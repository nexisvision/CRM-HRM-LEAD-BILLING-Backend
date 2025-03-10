import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import OfferLetter from "../../models/offerletter.js";
import uploadToS3 from "../../utils/uploadToS3.js";

export default {
    validator: validator({
        body: Joi.object({
            job: Joi.string().required(),
            job_applicant: Joi.string().required(),
            offer_expiry: Joi.date().required(),
            expected_joining_date: Joi.date().required(),
            salary: Joi.string().required(),
            rate: Joi.string().required(),
            description: Joi.string().required(),
        }),
        file: Joi.object({
            fieldname: Joi.string(),
            originalname: Joi.string(),
            encoding: Joi.string(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'application/pdf'),
            size: Joi.number().max(5 * 1024 * 1024) // 5MB max
        }).allow(null)
    }),
    handler: async (req, res) => {
        try {
            const file = req.file;
            const { 
                job, 
                job_applicant, 
                offer_expiry, 
                expected_joining_date, 
                salary,
                rate,
                description 
            } = req.body;

            // Check if offer letter already exists
            const existingOfferLetter = await OfferLetter.findOne({ 
                where: { job, job_applicant } 
            });

            if (existingOfferLetter) {
                return responseHandler.error(res, "Offer letter already exists");
            }

            // Upload file to S3 if provided
            let fileUrl = null;
            if (file) {
                fileUrl = await uploadToS3(
                    file, 
                    req.user?.roleName, 
                    "offer-letters", 
                    req.user?.username
                );
            }

            // Create offer letter
            const offerletter = await OfferLetter.create({ 
                job,
                job_applicant,
                offer_expiry,
                expected_joining_date,
                salary,
                rate,
                description,
                file: fileUrl,
                client_id: req.des?.client_id,
                created_by: req.user?.username 
            });

            return responseHandler.success(
                res, 
                "Offer letter created successfully", 
                offerletter
            );
        } catch (error) {
            console.error('Error creating offer letter:', error);
            return responseHandler.error(res, error.message || "Failed to create offer letter");
        }
    }
}


