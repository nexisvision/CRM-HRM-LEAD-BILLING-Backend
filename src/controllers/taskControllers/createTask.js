import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Notification from "../../models/notificationModel.js";
import isSameDay from "../../utils/isSameDay.js"
import uploadToS3 from "../../utils/uploadToS3.js";
import { s3 } from '../../config/config.js';

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            taskName: Joi.string().required(),
            // category: Joi.string().required(),
            // project: Joi.string().required(),
            // lead: Joi.string().required().optional(),
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

            const task_file = req.files?.task_file?.[0];

           

            const {
                taskName,
                // category,
                // project,
                // lead,
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


            if (!task_file) {
                return responseHandler.error(res, "Task file is required");
            }
            // const esignatureUrl = await uploadToS3(esignature, "esignatures", esignature_name, req.user?.username);
            let task_file_url = task_file;
            if (task_file) {
                if (task_file.task_file) {
                    const key = decodeURIComponent(task_file.split(".com/").pop());
                    const s3Params = {
                        Bucket: s3.config.bucketName,
                        Key: key,
                    };
                    try {
                        await s3.deleteObject(s3Params).promise();
                    } catch (error) {
                        console.error('Error deleting old signature:', error);
                    }
                }
                task_file_url = await uploadToS3(task_file, "task_files", task_file.originalname, req.user?.username);
            }


            const task = await Task.create({
                related_id: id,
                taskName,
                // category,
                // project,
                // lead,
                startDate,
                dueDate,
                assignTo,
                description,
                priority,
                status,
                reminder_date,
                task_file: task_file_url,
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

