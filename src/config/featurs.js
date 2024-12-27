const features = [
    {
        name: 'staff',
        modules: [
            {
                name: 'users',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'roles',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'clients',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'meetings',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'permissions',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            }
        ]
    },
    {
        name: 'crm',
        modules: [
            {
                name: 'lead',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'deal',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'task',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            }
        ]
    },
    {
        name: 'hrm',
        modules: [
            {
                name: 'employee',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'meetings',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'attendance',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'leaves',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            },
            {
                name: 'events',
                permissions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false
                }
            }
        ]
    }
];

export default features;