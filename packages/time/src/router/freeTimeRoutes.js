import FreeTimeIndex from "../front/views/freeTime/FreeTimeIndex.vue";
import FreeTimeDashboard from "../front/views/freeTime/FreeTimeDashboard.vue";
import FreeTimeDetail from "../front/views/freeTime/FreeTimeDetail.vue";
import FreeTimeCreate from "../front/views/freeTime/FreeTimeCreate.vue";

export default [
    {
        path: 'free-time',
        name: 'free-time-index',
        component: FreeTimeIndex,
        children: [
            {
                path: '',
                name: 'free-time-dashboard',
                component: FreeTimeDashboard
            },
            {
                path: ':id',
                name: 'free-time-detail',
                component: FreeTimeDetail,
                params: true
            },
            {
                path: 'create',
                name: 'free-time-create',
                component: FreeTimeCreate
            }
        ]
    }
]

