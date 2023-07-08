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
                path: '',
                name: 'holiday-dashboard',
                component: HolidayDashboard
            },
            {
                path: ':id',
                name: 'holiday-detail',
                component: HolidayDetail,
                params: true
            },
            {
                path: 'create',
                name: 'holiday-create',
                component: HolidayCreate
            }
        ]
    }
]