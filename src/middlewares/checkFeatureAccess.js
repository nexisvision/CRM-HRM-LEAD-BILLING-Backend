export const checkFeatureAccess = (feature) => {
    return async (req, res, next) => {
        try {
            const subscription = req.subscription;
            const plan = subscription.SubscriptionPlan;

            if (!plan.features[feature]) {
                return responseHandler.forbidden(res,
                    `Your subscription plan doesn't include ${feature} feature`
                );
            }

            next();
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    };
};

// Usage in routes
router.post('/hrm/employees',
    authenticateUser,
    checkSubscriptionStatus,
    checkFeatureAccess('hrm'),
    createEmployee.handler
); 