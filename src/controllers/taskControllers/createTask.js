import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Notification from "../../models/notificationModel.js";
import isSameDay from "../../utils/isSameDay.js"

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
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
            reminder_date: Joi.date().optional().allow('', null),
        }),
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
                status,
                reminder_date,
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
                reminder_date,
                created_by: req.user?.username,
            });

            if (reminder_date) {
                const reminderDate = new Date(reminder_date);
                const today = new Date();

                if (isSameDay(reminderDate, today)) {
                    const dueDateDiff = Math.ceil(
                        (new Date(dueDate) - reminderDate) / (1000 * 60 * 60 * 24)
                    );
                    await Notification.create({
                        related_id: id,
                        users: assignTo,
                        title: "Task Reminder",
                        notification_type: "reminder",
                        from: req.user?.id,
                        message: `Task due: ${dueDateDiff} days. Don't forget: ${taskName}`,
                        description: `Task Name: ${taskName}, start date: ${startDate}, due date: ${dueDate}`,
                        created_by: req.user?.username,
                    });
                }
            }

            await Notification.create({
                related_id: id,
                users: assignTo,
                title: "New Task",
                from: req.user?.id,
                message: `${req.user?.username} assigned you a task: ${taskName}`,
                description: `Task Name: ${taskName}, start date: ${startDate}, due date: ${dueDate}`,
                created_by: req.user?.username,
            });

            responseHandler.success(res, "Task created successfully", task);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    },
};

