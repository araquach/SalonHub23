import SickIndex from "../front/views/sick/SickIndex.vue";
import SickDashboard from "../front/views/sick/SickDashboard.vue";
import SickDetail from "../front/views/sick/SickDetail.vue";
import SickCreate from "../front/views/sick/SickCreate.vue";

export default [
    {
        path: 'sick',
        name: 'sick-index',
        component: SickIndex,
        children: [
            {
                path: ':filter',
                name: 'sick-dashboard',
                component: SickDashboard,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'sick-detail',
                component: SickDetail,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'create',
                name: 'sick-create',
                component: SickCreate,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]