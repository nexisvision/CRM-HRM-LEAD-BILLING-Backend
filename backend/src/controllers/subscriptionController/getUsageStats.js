import User from "../../models/userModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const clientId = req.user.clientId;

            const stats = {
                users: await User.count({ where: { clientId } }),
                storage: await calculateStorageUsed(clientId),
                features: await getActiveFeatures(clientId)
            };

            const limits = await getPlanLimits(clientId);

            responseHandler.success(res, "Usage stats retrieved", {
                current: stats,
                limits: limits
            });
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}; 