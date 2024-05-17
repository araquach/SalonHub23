import TimeAdminIndex from "../../front/views/time/admin/TimeAdminIndex.vue";
import TimeAdminDashboard from "../../front/views/time/admin/TimeAdminDashboard.vue";
import holidayAdminRoutes from "./holidayAdminRoutes";
import lieuAdminRoutes from "./lieuAdminRoutes";
import freeTimeAdminRoutes from "./freeTimeAdminRoutes";
import sickAdminRoutes from "./sickAdminRoutes";

export default [
    {
        path: 'time',
        component: TimeAdminIndex,
        children: [
            {
                path: '',
                name: 'time-admin-dashboard',
                component: TimeAdminDashboard,
                meta: {
                    requiresAuth: true
                }
            },
            ...holidayAdminRoutes,
            ...lieuAdminRoutes,
            ...freeTimeAdminRoutes,
            ...sickAdminRoutes
        ]
    },
]