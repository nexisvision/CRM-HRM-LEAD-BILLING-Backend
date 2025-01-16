import ProjectReport from "../../models/projectReportModel.js";
import responseHandler from "../../utils/responseHandler.js";
import Joi from "joi";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number(),
            limit: Joi.number()
        })
    }),
    handler: async (req, res) => {
        try {
            const projectReports = await ProjectReport.findAll();
            return responseHandler.success(res, "Project reports fetched successfully", projectReports);
        }
        catch (error) {
            return responseHandler.error(res, error);
        }
    }
}