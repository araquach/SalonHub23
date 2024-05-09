import FreeTimeIndex from "../front/views/freeTime/FreeTimeIndex.vue";
import FreeTimeDashboard from "../front/views/freeTime/FreeTimeDashboard.vue";
import FreeTimeDetail from "../front/views/freeTime/FreeTimeDetail.vue";
import FreeTimeCreate from "../front/views/freeTime/FreeTimeCreate.vue";
import FreeTimeUpdate from "../front/views/freeTime/FreeTimeUpdate.vue";

export default [
    {
        path: 'free-time',
        name: 'free-time-index',
        component: FreeTimeIndex,
        children: [
            {
                path: ':filter',
                name: 'free-time-dashboard',
                component: FreeTimeDashboard,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'free-time-detail',
                component: FreeTimeDetail,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'create',
                name: 'free-time-create',
                component: FreeTimeCreate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'update/:id',
                name: 'free-time-update',
                component: FreeTimeUpdate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]

