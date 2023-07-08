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
                path: '',
                name: 'sick-dashboard',
                component: SickDashboard
            },
            {
                path: ':id',
                name: 'sick-detail',
                component: SickDetail,
                params: true
            },
            {
                path: 'create',
                name: 'sick-create',
                component: SickCreate
            }
        ]
    }
]