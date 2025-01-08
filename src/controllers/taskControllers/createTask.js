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


            await Notification.create({
                users: assignTo,
                title: `New Task`,
                message: `${req.user?.username} has assigned you a new task`,
                description: `Task Name: ${taskName}`,
                created_by: req.user?.username
            })

            responseHandler.success(res, "Task created successfully", task);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
};
