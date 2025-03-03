import Joi from "joi";
import Meeting from "../../models/meetingModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Notification from "../../models/notificationModel.js";
import isSameDay from "../../utils/isSameDay.js"

export default {
    validator: validator({
        body: Joi.object({
            department: Joi.string().required(),
            employee: Joi.any().optional(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            date: Joi.date().required(),
            startTime: Joi.string().required(),
            endTime: Joi.string().optional().allow("",null),
            meetingLink: Joi.string().optional().allow("",null),
            client: Joi.string().optional().allow("",null),
            status: Joi.string().valid('scheduled', 'completed', 'cancelled').default('scheduled')
        })
    }),
    handler: async (req, res) => {
        try {
            const { title, date, startTime, endTime, description, meetingLink, status,client, department, employee } = req.body;

            const existingMeeting = await Meeting.findOne({ where: { title, date, startTime, endTime, description, meetingLink, status, department, employee } });
            if (existingMeeting) {
                return responseHandler.error(res, "Meeting already exists");
            }
            const meeting = await Meeting.create({
                title,
                description,
                date,
                startTime,
                endTime,
                meetingLink,
                status,
                department,
                employee,
                client,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });


            if (date) {
                const reminderDate = new Date(date);
                const today = new Date();

                if (isSameDay(reminderDate, today)) {
                    const dueDateDiff = Math.ceil(
                        (new Date(date) - reminderDate) / (1000 * 60 * 60 * 24)
                    );
                    await Notification.create({
                        related_id: meeting.id,
                        users: employee,
                        title: "Meeting Reminder",
                        notification_type: "reminder",
                        from: req.user?.id,
                        client_id: req.des?.client_id,
                        message: `Meeting due: ${dueDateDiff} days. Don't forget: ${title}`,
                        description: `Meeting Name: ${title}, start date: ${date}, end date: ${endTime}`,
                        created_by: req.user?.username,
                    });
                }
            }

            await Notification.create({
                related_id: meeting.id,
                users: employee,
                title: "New Meeting",
                from: req.user?.id,
                
                message: `${req.user?.username} assigned you a meeting: ${title}`,
                description: `Meeting Name: ${title}, start date: ${date}, end date: ${endTime}`,
                created_by: req.user?.username,
            });


            return responseHandler.success(res, "Meeting created successfully", meeting);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}
