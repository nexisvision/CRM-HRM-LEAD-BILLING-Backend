import ProjectReport from "../../models/projectReportModel.js";
import Joi from "joi";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
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
            const { project, startdate, enddate, projectMembers, completion, status } = req.body;
            const projectReport = await ProjectReport.create({
                project,
                startdate,
                enddate,
                projectMembers,
                completion,
                status,
                created_by: req.user?.username
            });
            return responseHandler.created(res, "Project report created successfully", projectReport);
        } catch (error) {

            return responseHandler.error(res, error.message);
        }
    }
}