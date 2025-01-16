import responseHandler from "../../utils/responseHandler.js";

export default function checkPermission(entity) {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.permissions) {
                responseHandler.error(res, "Permissions not found for the user");
            }

            const permissions = req.user.permissions;
            let entityPermissions = null;
            for (const module in permissions) {
                if (permissions[module][entity]) {
                    entityPermissions = permissions[module][entity];
                    break;
                }
            }
            const action = { POST: 'create', GET: 'view', PUT: 'update', DELETE: 'delete' }[req.method];
            if (!action) {
                responseHandler.error(res, 'Method not allowed');
            }

            if (!entityPermissions) {
                responseHandler.error(res, 'You are not authorized to perform this action');
            }

            if (typeof entityPermissions[action] === "undefined") {
                responseHandler.error(res, 'You are not authorized to perform this action');
            }

            if (!entityPermissions[action]) {
                responseHandler.error(res, 'You are not authorized to perform this action');
            }

            next();
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    };
}
