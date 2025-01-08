import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Notification from "../../models/notificationModel.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            taskName: Joi.string().required(),
            category: Joi.string().required(),
            project: Joi.string().required(),
            startDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            assignTo: Joi.object().required(),
            description: Joi.string().required(),
            priority: Joi.string().required(),
            status: Joi.string().required(),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                taskName,
                category,
                project,
                startDate,
                dueDate,
                assignTo,
                description,
                priority,
                status
            } = req.body;


            const task = await Task.create({
                related_id: id,
                taskName,
                category,
                project,
                startDate,
                dueDate,
                assignTo,
                description,
                priority,
                status,
                created_by: req.user?.username
            });

            function getTwoDaysAgoDate(date) {
                const twoDaysAgo = new Date(date);
                twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
                return twoDaysAgo;
            }

            // Example usage:
            const today = new Date();
            const twoDaysAgo = getTwoDaysAgoDate(dueDate);

            const notificationType = twoDaysAgo <= today;

            if (notificationType) {
                try {
                    await Notification.create({
                        related_id: id,
                        users: assignTo,
                        title: "Task Reminder", // More specific title
                        notification_type: "reminder",
                        from: req.user?.id,
                        message: `${req.user?.username} has assigned you a task due in 2 days. Don't forget to complete it: Task Name: ${taskName}, Due Date: ${dueDate}`,
                        description: `Task Name: ${taskName}, start date: ${startDate}, due date: ${dueDate}`,
                        created_by: req.user?.username,
                    });
                } catch (error) {
                    console.error("Error creating reminder notification:", error);
                }
            }


            await Notification.create({
                related_id: id,
                users: assignTo,
                title: "New Task",
                from: req.user?.id,
                message: `${req.user?.username} has assigned you a new task`,
                description: `Task Name: ${taskName}, start date: ${startDate}, due date: ${dueDate}`,
                created_by: req.user?.username
            })

            responseHandler.success(res, "Task created successfully", task);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
