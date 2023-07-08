import TimeIndex from "../front/views/TimeIndex.vue";
import holidayRoutes from "../router/holidayRoutes";
import TimeDashboard from "../front/views/TimeDashboard.vue";

export default [
    {
        path: '/time',
        component: TimeIndex,
        children: [
            {
                path: '',
                name: 'time-dashboard',
                component: TimeDashboard
            },
            ...holidayRoutes
        ]
    },
]