import LieuIndex from "../front/views/lieu/LieuIndex.vue";
import LieuDashboard from "../front/views/lieu/LieuDashboard.vue";
import LieuDetail from "../front/views/lieu/LieuDetail.vue";
import LieuCreate from "../front/views/lieu/LieuCreate.vue";
import LieuUpdate from "../front/views/lieu/LieuUpdate.vue";

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
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'lieu-detail',
                component: LieuDetail,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'create',
                name: 'lieu-create',
                component: LieuCreate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'update/:id',
                name: 'lieu-update',
                component: LieuUpdate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]