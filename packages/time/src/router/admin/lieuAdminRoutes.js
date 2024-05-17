import LieuAdminIndex from "../../front/views/lieu/admin/LieuAdminIndex.vue"
import LieuAdminDashboard from "../../front/views/lieu/admin/LieuAdminDashboard.vue";

export default [
    {
        path: 'lieu',
        name: 'lieu-admin-index',
        component: LieuAdminIndex,
        children: [
            {
                path: '',
                name: 'lieu-admin-dashboard',
                props: true,
                component: LieuAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]