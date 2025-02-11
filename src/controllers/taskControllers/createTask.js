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
            // category: Joi.string().required(),
            // project: Joi.string().required(),
            lead: Joi.string().required().optional(),
            startDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            assignTo: Joi.any().optional(),
            priority: Joi.string().required(),
            status: Joi.string().required(),
            reminder_date: Joi.date().optional().allow('', null),
            description: Joi.string().optional().allow('', null)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                taskName,
                // category,
                // project,
                lead,
                startDate,
                dueDate,
                assignTo,
                description,
                priority,
                status,
                reminder_date,
            } = req.body;
            const existingTask = await Task.findOne({ where: { taskName } });
            if (existingTask) {
                return responseHandler.error(res, "Task already exists");
            }

            const task = await Task.create({
                related_id: id,
                taskName,
                // category,
                // project,
                lead,
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

            return responseHandler.success(res, "Task created successfully", task);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    },
};

