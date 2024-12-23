const responseHandler = {
    success: (res, message, data = null) => {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    },
    error: (res, message, status = 500) => {
        return res.status(status).json({
            success: false,
            message
        });
    },
    created: (res, message, data) => {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    },
    badRequest: (res, message) => {
        return res.status(400).json({
            success: false,
            message
        });
    },
    unauthorized: (res, message) => {
        return res.status(401).json({
            success: false,
            message
        });
    },
    forbidden: (res, message = 'Forbidden') => {
        return res.status(403).json({
            success: false,
            message
        });
    },
    notFound: (res, message) => {
        return res.status(404).json({
            success: false,
            message
        });
    },
    conflict: (res, message) => {
        return res.status(409).json({
            success: false,
            message
        });
    },
    internalServerError: (res, message) => {
        return res.status(500).json({
            success: false,
            message
        });
    },
    tooManyRequests: (res, message = 'Too many requests') => {
        return res.status(429).json({
            success: false,
            message
        });
    }
};

export default responseHandler;