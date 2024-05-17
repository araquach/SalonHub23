import LieuAdminIndex from "../../front/views/lieu/admin/LieuAdminIndex.vue"
import LieuAdminDashboard from "../../front/views/lieu/admin/LieuAdminDashboard.vue";
import LieuAdminDetail from "../../front/views/lieu/admin/LieuAdminDetail.vue";

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
]