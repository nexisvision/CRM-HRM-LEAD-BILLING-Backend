import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Notification from "../../models/notificationModel.js";
import isSameDay from "../../utils/isSameDay.js";

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
            reminder_date: Joi.date().allow('', null),
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
                priority,
                status,
                description,
                reminder_date
            } = req.body;
            const task = await Task.findByPk(id);
            if (!task) {
                return responseHandler.error(res, 'Task not found');
            }
            const updatedTask = await task.update({
                taskName,
                category,
                project,
                startDate,
                dueDate,
                assignTo,
                priority,
                status,
                description,
                reminder_date,
                updated_by: req.user?.username
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
                    });
                }
            }

            responseHandler.success(res, 'Task updated successfully', updatedTask);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}