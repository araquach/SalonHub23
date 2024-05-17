import MainAdminIndex from "../front/views/admin/MainAdminIndex.vue"
import MainAdminDashboard from "../front/views/admin/MainAdminDash.vue"
import TimeAdminRoutes from "time/src/router/admin/timeAdminRoutes";

export default [
    {
        path: '/admin',
        component: MainAdminIndex,
        children: [
            {
                path: '',
                name: 'main-admin-dashboard',
                component: MainAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            ...TimeAdminRoutes,
        ]
    },
]