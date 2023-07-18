import HolidayIndex from "../front/views/holiday/HolidayIndex.vue";
import HolidayDashboard from "../front/views/holiday/HolidayDashboard.vue";
import HolidayCreate from "../front/views/holiday/HolidayCreate.vue";
import HolidayDetail from "../front/views/holiday/HolidayDetail.vue";

export default [
    {
        path: 'holiday',
        name: 'holiday-index',
        component: HolidayIndex,
        children: [
            {
                path: ':filter',
                name: 'holiday-dashboard',
                component: HolidayDashboard,meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'detail/:id',
                name: 'holiday-detail',
                component: HolidayDetail,
                params: true,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'create',
                name: 'holiday-create',
                component: HolidayCreate,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]