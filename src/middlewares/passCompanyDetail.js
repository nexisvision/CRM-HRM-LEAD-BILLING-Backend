import Role from "../models/roleModel.js";
import responseHandler from "../utils/responseHandler.js";

const passClientId = async (req, res, next) => {
    try {
        const creatorRole = await Role.findByPk(req.user?.role);
        
        if (!creatorRole) {
            return responseHandler.error(res, "Invalid creator role");
        }

        let client_id;
        if (creatorRole.role_name === 'client') {
            client_id = req.user.id;
        } else if (creatorRole.role_name === 'super-admin') {
            client_id = req.user.id; 
        } else {
            client_id = req.user.client_id;
        }

        // Pass the client_id to the request object
        req.clientId = client_id;
        
        next();
    } catch (error) {
        return responseHandler.error(res, error?.message);
    }
};

export default passClientId;
