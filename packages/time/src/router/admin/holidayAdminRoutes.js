import HolidayAdminIndex from "../../front/views/holiday/admin/HolidayAdminIndex.vue"
import HolidayAdminDashboard from "../../front/views/holiday/admin/HolidayAdminDashboard.vue";
import HolidayAdminDetail from "../../front/views/holiday/admin/HolidayAdminDetail.vue";
import HolidayUpdate from "../../front/views/holiday/HolidayUpdate.vue";

export default [
    {
        path: 'holiday',
        component: HolidayAdminIndex,
        children: [
            {
                path: '',
                name: 'holiday-admin-dashboard',
                component: HolidayAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'all/:staff_id',
                name: 'holidays-by-staff',
                component: HolidayAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'holiday-admin-detail',
                component: HolidayAdminDetail,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'update/:id',
                name: 'holiday-admin-update',
                component: HolidayUpdate,
                props: true,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]