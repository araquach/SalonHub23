import SickAdminIndex from "../../front/views/sick/admin/SickAdminIndex.vue"
import SickAdminDashboard from "../../front/views/sick/admin/SickAdminDashboard.vue";

export default [
    {
        path: 'sick',
        name: 'sick-admin-index',
        component: SickAdminIndex,
        children: [
            {
                path: '',
                name: 'sick-admin-dashboard',
                props: true,
                component: SickAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]