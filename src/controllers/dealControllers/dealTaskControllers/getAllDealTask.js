import responseHandler from "../../../utils/responseHandler.js";
import Task from "../../../models/taskModel.js";
import Joi from "joi";
import validator from "../../../utils/validator.js";

export default {
  validator: validator({  
    params: Joi.object({
        dealId: Joi.string().required().messages({
            'string.base': 'Deal ID must be a string',
            'string.empty': 'Deal ID is required'
        })
    }),
    query: Joi.object({
        page: Joi.number().optional().default(1),
        limit: Joi.number().optional().default(10)
    })
  }),
  handler: async (req, res) => {
    try {
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;  
        const tasks = await Task.findAll({
            where: {
                dealId: req.params.dealId
            },
            offset,
            limit
        });
        responseHandler.success(res, "Deal tasks fetched successfully", tasks);
    } catch (error) {
        console.error('Error fetching deal tasks:', error);
        responseHandler.error(res, error.message);
    }
  } 
}