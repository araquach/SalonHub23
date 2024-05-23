import FreeTimeAdminIndex from "../../front/views/freeTime/admin/FreeTimeAdminIndex.vue"
import FreeTimeAdminDashboard from "../../front/views/freeTime/admin/FreeTimeAdminDashboard.vue";
import FreeTimeAdminDetail from "../../front/views/freeTime/admin/FreeTimeAdminDetail.vue";

export default [
    {
        path: 'free-time',
        component: FreeTimeAdminIndex,
        children: [
            {
                path: '',
                name: 'free-time-admin-dashboard',
                component: FreeTimeAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: 'detail/:id',
        name: 'free-time-admin-detail',
        component: FreeTimeAdminDetail,
        props: true,
        meta: {
            requiresAuth: true
        }
    }
]