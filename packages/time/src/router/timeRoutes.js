import TimeIndex from "../front/views/TimeIndex.vue";
import holidayRoutes from "../router/holidayRoutes";

export default [
    {
        path: '/time',
        name: 'time-index',
        component: TimeIndex,
        children: [
            ...holidayRoutes
        ]
    },
]