import Joi from "joi";
import Tag from "../../models/labelModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

const defaultStatuses = [
    { name: "To Do", color: "#E5E7EB", lableType: "status" },
    { name: "In Progress", color: "#60A5FA", lableType: "status" },
    { name: "Done", color: "#34D399", lableType: "status" },
    { name: "Pending", color: "#FCD34D", lableType: "status" },
    { name: "Under Review", color: "#A78BFA", lableType: "status" },
    { name: "On Hold", color: "#F87171", lableType: "status" },
    { name: "Blocked", color: "#EF4444", lableType: "status" },
    { name: "Approved", color: "#10B981", lableType: "status" },
    { name: "Rejected", color: "#DC2626", lableType: "status" }
];

const defaultTags = [
    { name: "Bug", color: "#EF4444", lableType: "tag" },
    { name: "Feature", color: "#3B82F6", lableType: "tag" },
    { name: "Urgent", color: "#DC2626", lableType: "tag" },
    { name: "Improvement", color: "#10B981", lableType: "tag" },
    { name: "Critical", color: "#F87171", lableType: "tag" },
    { name: "Research", color: "#8B5CF6", lableType: "tag" },
    { name: "Update", color: "#60A5FA", lableType: "tag" },
    { name: "Test", color: "#34D399", lableType: "tag" },
    { name: "Review", color: "#A78BFA", lableType: "tag" }
];

// Add default business categories
const defaultCategories = [
    { name: "Information Technology", color: "#3B82F6", lableType: "category" },
    { name: "Healthcare", color: "#10B981", lableType: "category" },
    { name: "Finance", color: "#6366F1", lableType: "category" },
    { name: "Education", color: "#F59E0B", lableType: "category" },
    { name: "E-commerce", color: "#8B5CF6", lableType: "category" },
    { name: "Manufacturing", color: "#EC4899", lableType: "category" },
    { name: "Real Estate", color: "#14B8A6", lableType: "category" },
    { name: "Retail", color: "#F97316", lableType: "category" },
    { name: "Consulting", color: "#6366F1", lableType: "category" },
    { name: "Marketing", color: "#EF4444", lableType: "category" },
    { name: "Transportation", color: "#84CC16", lableType: "category" },
    { name: "Construction", color: "#CA8A04", lableType: "category" },
    { name: "Entertainment", color: "#9333EA", lableType: "category" },
    { name: "Food & Beverage", color: "#EA580C", lableType: "category" },
    { name: "Travel & Tourism", color: "#2DD4BF", lableType: "category" }
];

export const seedDefaultLabels = async (related_id, client_id, created_by) => {
    try {
        // Check if labels already exist for this related_id
        const existingLabels = await Tag.findAll({
            where: { related_id, client_id }
        });

        if (existingLabels.length === 0) {
            // Create default statuses
            const createdStatuses = await Promise.all(
                defaultStatuses.map(async (status) => {
                    try {
                        return await Tag.create({
                            related_id,
                            name: status.name,
                            color: status.color,
                            lableType: status.lableType,
                            client_id,
                            created_by
                        });
                    } catch (error) {
                        console.error("Error creating status:", error);
                        return null;
                    }
                })
            );

            // Create default tags
            const createdTags = await Promise.all(
                defaultTags.map(async (tag) => {
                    try {
                        return await Tag.create({
                            related_id,
                            name: tag.name,
                            color: tag.color,
                            lableType: tag.lableType,
                            client_id,
                            created_by
                        });
                    } catch (error) {
                        console.error("Error creating tag:", error);
                        return null;
                    }
                })
            );

            // Create default categories
            const createdCategories = await Promise.all(
                defaultCategories.map(async (category) => {
                    try {
                        return await Tag.create({
                            related_id,
                            name: category.name,
                            color: category.color,
                            lableType: category.lableType,
                            client_id,
                            created_by
                        });
                    } catch (error) {
                        console.error("Error creating category:", error);
                        return null;
                    }
                })
            );

            return [...createdStatuses, ...createdTags, ...createdCategories].filter(l => l !== null);
        }

        return existingLabels;
    } catch (error) {
        throw error;
    }
};

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            name: Joi.string().required(),
            color: Joi.string().allow('', null),
            lableType: Joi.string().allow('', null),
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, color, lableType } = req.body;

            const existingTag = await Tag.findOne({
                where: { related_id: id, name, lableType }
            });
            if (existingTag) {
                return responseHandler.error(res, "Tag with this name already exists");
            }

            const newTag = await Tag.create({
                related_id: id,
                name,
                color,
                lableType,
                client_id: req.des?.client_id,
                created_by: req.user?.username
            });
            return responseHandler.success(res, "Tag created successfully", newTag);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};