import ProjectReport from "../../models/projectReportModel.js";
import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            project: Joi.string().required(),
            startdate: Joi.date().required(),
            enddate: Joi.date().required(),
            projectMembers: Joi.object().required(),
            completion: Joi.string().required(),
            status: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { project, startdate, enddate, projectMembers, completion, status } = req.body;

            const projectReport = await ProjectReport.findByPk(id);
            if (!projectReport) {
                return responseHandler.notFound(res, "Project report not found");
            }

            const updatedProjectReport = await projectReport.update({
                project,
                startdate,
                enddate,
                projectMembers,
                completion,
                status,
                updated_by: req.user?.username
            });


            responseHandler.success(res, "Project report updated successfully", updatedProjectReport);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}