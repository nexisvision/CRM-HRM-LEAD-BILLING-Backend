import Joi from "joi";
import validator from "../../utils/validator.js";
import InterviewSchedule from "../../models/interviewSchedule.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            job: Joi.string().required(),
            candidate: Joi.string().required(),
            interviewer: Joi.string().required(),
            round: Joi.string().required(),
            interviewType: Joi.string().required(),
            startOn: Joi.date().required(),
            startTime: Joi.string().required(),
            commentForInterviewer: Joi.string().optional(),
            commentForCandidate: Joi.string().optional(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { job, candidate, interviewer, round, interviewType, startOn, startTime, commentForInterviewer, commentForCandidate } = req.body;
            const interviewSchedule = await InterviewSchedule.findByPk(req.params.id);
            await interviewSchedule.update({ job, candidate, interviewer, round, interviewType, startOn, startTime, commentForInterviewer, commentForCandidate, created_by: req.user?.username });
            responseHandler.success(res, "Interview schedule updated successfully", interviewSchedule);
        } catch (error) {
            responseHandler.error(res, error);
        }
    }
}

