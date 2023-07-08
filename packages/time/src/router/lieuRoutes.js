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
                path: '',
                name: 'lieu-dashboard',
                component: LieuDashboard,
            },
            {
                path: ':id',
                name: 'lieu-detail',
                component: LieuDetail,
                params: true
            },
            {
                path: 'create',
                name: 'lieu-create',
                component: LieuCreate,
            }
        ]
    }
]