import Joi from "joi";
import Task from "../../models/taskModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional().default(1).messages({
                'number.base': 'Page must be a number'
            }),
            limit: Joi.number().optional().default(10).messages({
                'number.base': 'Limit must be a number'
            })
        })
    }),
    handler: async (req, res) => {
     
     try {
        // const { page, limit } = req.query;
        // const offset = (page - 1) * limit;
        const tasks = await Task.findAll({});
        responseHandler.success(res, tasks);
    } catch (error) {
        responseHandler.error(res, error);
    }       
    }
}
