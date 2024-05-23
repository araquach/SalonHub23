import SickAdminIndex from "../../front/views/sick/admin/SickAdminIndex.vue"
import SickAdminDashboard from "../../front/views/sick/admin/SickAdminDashboard.vue";
import SickAdminDetail from "../../front/views/sick/admin/SickAdminDetail.vue";

export default [
    {
        path: 'sick',
        component: SickAdminIndex,
        children: [
            {
                path: '',
                name: 'sick-admin-dashboard',
                component: SickAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'sick-admin-detail',
                component: SickAdminDetail,
                props: true,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }

]