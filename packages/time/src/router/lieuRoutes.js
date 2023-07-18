import LieuIndex from "../front/views/lieu/LieuIndex.vue";
import LieuDashboard from "../front/views/lieu/LieuDashboard.vue";
import LieuDetail from "../front/views/lieu/LieuDetail.vue";
import LieuCreate from "../front/views/lieu/LieuCreate.vue";

export default [
    {
        path: 'lieu',
        name: 'lieu-index',
        component: LieuIndex,
        children: [
            {
                path: ':filter',
                name: 'lieu-dashboard',
                component: LieuDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'lieu-detail',
                component: LieuDetail,
                params: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'create',
                name: 'lieu-create',
                component: LieuCreate,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]