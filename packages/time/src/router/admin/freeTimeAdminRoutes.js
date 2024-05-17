import FreeTimeAdminIndex from "../../front/views/freeTime/admin/FreeTimeAdminIndex.vue"
import FreeTimeAdminDashboard from "../../front/views/freeTime/admin/FreeTimeAdminDashboard.vue";

export default [
    {
        path: 'free-time',
        name: 'free-time-admin-index',
        component: FreeTimeAdminIndex,
        children: [
            {
                path: '',
                name: 'free-time-admin-dashboard',
                props: true,
                component: FreeTimeAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]