import ProjectReport from "../../models/projectReportModel.js";
import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const projectReport = await ProjectReport.findByPk(id);
            if (!projectReport) {
                responseHandler.notFound(res, "Project report not found");
            }
            await projectReport.destroy();
            responseHandler.success(res, "Project report deleted successfully", projectReport);
        }
        catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}