import LieuAdminIndex from "../../front/views/lieu/admin/LieuAdminIndex.vue"
import LieuAdminDashboard from "../../front/views/lieu/admin/LieuAdminDashboard.vue";
import LieuAdminDetail from "../../front/views/lieu/admin/LieuAdminDetail.vue";
import LieuUpdate from "../../front/views/lieu/LieuUpdate.vue";

export default [
    {
        path: 'lieu',
        component: LieuAdminIndex,
        children: [
            {
                path: '',
                name: 'lieu-admin-dashboard',
                component: LieuAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'all/:staff_id',
                name: 'lieu-hours-by-staff',
                component: LieuAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'lieu-admin-detail',
                component: LieuAdminDetail,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'update/:id',
                name: 'lieu-admin-update',
                component: LieuUpdate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]