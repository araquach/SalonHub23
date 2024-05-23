import HolidayAdminIndex from "../../front/views/holiday/admin/HolidayAdminIndex.vue"
import HolidayAdminDashboard from "../../front/views/holiday/admin/HolidayAdminDashboard.vue";
import HolidayAdminDetail from "../../front/views/holiday/admin/HolidayAdminDetail.vue";

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
                path: 'detail/:id',
                name: 'holiday-admin-detail',
                component: HolidayAdminDetail,
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
        ]
    }
]