import SickAdminIndex from "../../front/views/sick/admin/SickAdminIndex.vue"
import SickAdminDashboard from "../../front/views/sick/admin/SickAdminDashboard.vue";
import SickAdminDetail from "../../front/views/sick/admin/SickAdminDetail.vue";
import SickCreate from "../../front/views/sick/admin/SickCreate.vue";
import SickUpdate from "../../front/views/sick/admin/SickUpdate.vue";

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
                path: 'all/:staff_id',
                name: 'sick-days-by-staff',
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
            },
            {
                path: 'create',
                name: 'sick-create',
                component: SickCreate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'update/:id',
                name: 'sick-admin-update',
                component: SickUpdate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }

]