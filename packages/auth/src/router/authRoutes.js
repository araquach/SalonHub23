import AuthIndex from "../front/views/AuthIndex.vue";

export default [
    {
        path: '/auth',
        name: 'auth',
        component: AuthIndex,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/register',
                name: 'register',
                component: Register
            },
            {
                path: '',
                name: 'home',
                component: MainDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: MainDashboard
            }
        ]
    },
]