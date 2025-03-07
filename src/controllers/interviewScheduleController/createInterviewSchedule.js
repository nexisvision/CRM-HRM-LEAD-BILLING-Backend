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
            const existingInterviewSchedule = await InterviewSchedule.findOne({ where: { job, candidate, interviewer, round, interviewType, startOn, startTime } });
            if (existingInterviewSchedule) {
                return responseHandler.error(res, "Interview schedule already exists");
            }
            const interviewSchedule = await InterviewSchedule.create({ job, candidate, interviewer, round, interviewType, startOn, startTime, commentForInterviewer, commentForCandidate, 
                client_id: req.des?.client_id,
                created_by: req.user?.username });
            return responseHandler.success(res, "Interview schedule created successfully", interviewSchedule);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}

