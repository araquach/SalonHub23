import {createRouter, createWebHistory} from 'vue-router'
import MainIndex from '../front/views/MainIndex.vue'
import FinanceRoutes from "finance/src/router/financeRoutes"
import TimeRoutes from "time/src/router/timeRoutes";
import PerformanceRoutes from "performance/src/router/performanceRoutes"
import RecruitmentRoutes from "recruitment/src/router/recruitmentRoutes";
import AuthRoutes from "auth/src/router/authRoutes";
// import ReviewsRoutes from "../reviews/router"
// import StockRoutes from "../stock/router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main-index',
            component: MainIndex,
            meta: {
                requiresAuth: true
            }
        },
        ...FinanceRoutes,
        ...TimeRoutes,
        ...PerformanceRoutes,
        ...RecruitmentRoutes,
        ...AuthRoutes
        // ...ReviewsRoutes,
        // ...StockRoutes
    ]
})

export default router
