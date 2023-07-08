import HolidayIndex from "../front/views/holiday/HolidayIndex.vue";
import HolidayCreate from "../front/components/holiday/HolidayCreate.vue";
import HolidayDetail from "../front/components/holiday/HolidayDetail.vue";
import HolidayDashboard from "../front/views/holiday/HolidayDashboard.vue";

export default [
    {
        path: 'holiday',
        name: 'holiday-index',
        component: HolidayIndex,
        children: [
            {
                path: 'dashboard',
                name: 'holiday-dashboard',
                component: HolidayDashboard
            },
            // {
            //     path: 'bookings/:filter',
            //     name: 'holiday-index',
            //     component: HolidayIndex,
            //     // meta: {
            //     //     requiresAuth: true
            //     // }
            // },
            // {
            //     path: 'booking',
            //     name: 'holiday-create',
            //     component: HolidayCreate,
            //     // meta: {
            //     //     requiresAuth: true
            //     // }
            // },
            // {
            //     path: 'detail/:id',
            //     name: 'holiday-detail',
            //     component: HolidayDetail,
            //     // meta: {
            //     //     requiresAuth: true
            //     // }
            // }
        ]
    }
]