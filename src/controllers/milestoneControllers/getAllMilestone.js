import { query } from "express";
import Milestone from "../../models/milestoneModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";
import Joi from "joi";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        query: Joi.object({
            page: Joi.number().default(1),
            limit: Joi.number().default(10)
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
           
            const milestones = await Milestone.findAll({ where: { related_id: id }});
            responseHandler.success(res, "Milestones fetched successfully", milestones);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
}