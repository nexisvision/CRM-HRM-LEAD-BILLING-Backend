import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Notification from "../../models/notificationModel.js";
import isSameDay from "../../utils/isSameDay.js";
import { Op } from "sequelize";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            taskName: Joi.string().required(),
            task_reporter: Joi.string().required(),
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
            console.log(req.body);
            const {
                taskName,
                task_reporter,
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
            const existingTask = await Task.findOne({ where: { taskName, id: { [Op.not]: id } } });
            if (existingTask) {
                return responseHandler.error(res, "Task already exists");
            }
            const updatedTask = await task.update({
                taskName,
                task_reporter,
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

            return responseHandler.success(res, 'Task updated successfully', updatedTask);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
}