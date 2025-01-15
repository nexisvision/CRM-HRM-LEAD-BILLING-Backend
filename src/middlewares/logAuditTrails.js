import AuditTrail from "../models/auditTrailModel.js";

const methodMappers = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export default async function logAuditTrails(req, res, next) {
    try {
        const startTime = Date.now();
        const originalJson = res.json;
        res.json = async function (body) {
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000; // Convert to seconds

            // Extract path starting from 'api'
            const fullPath = req.originalUrl;
            const apiIndex = fullPath.indexOf('api');
            const pathFromApi = apiIndex !== -1 ? fullPath.substring(apiIndex) : fullPath;

            await AuditTrail.create({
                url: req.originalUrl,
                activity: `${methodMappers[req.method]} ${pathFromApi}`,
                params: JSON.stringify(req.params),
                query: JSON.stringify(req.query),
                payload: JSON.stringify(req.body),
                response: JSON.stringify(body),
                duration: `${duration.toFixed(2)} seconds`
            });
            return originalJson.call(this, body);
        }
        next();
    } catch (error) {
        console.log("🛑>>>>> an error occurred logging audit trail >>>>>>>>🛑");
        console.log(error.message);
        next();
    }
}
