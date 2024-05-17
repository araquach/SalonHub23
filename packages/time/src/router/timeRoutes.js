import TimeIndex from "../front/views/time/TimeIndex.vue";
import holidayRoutes from "./holidayRoutes";
import TimeDashboard from "../front/views/time/TimeDashboard.vue";
import freeTimeRoutes from "../router/freeTimeRoutes";
import sickRoutes from "../router/sickRoutes";
import lieuRoutes from "../router/lieuRoutes";

export default [
    {
        path: '/time',
        component: TimeIndex,
        children: [
            {
                path: '',
                name: 'time-dashboard',
                component: TimeDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            ...holidayRoutes,
            ...lieuRoutes,
            ...freeTimeRoutes,
            ...sickRoutes,
        ]
    },
]