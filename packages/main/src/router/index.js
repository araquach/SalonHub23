import {createRouter, createWebHistory} from 'vue-router'
import MainIndex from '../front/views/Index.vue'
import FinanceRoutes from "finance/src/router/finance"
import TimeRoutes from "time/src/router/timeRoutes";
import PerformanceRoutes from "performance/src/router/performanceRoutes"
import RecruitmentRoutes from "recruitment/src/router/recruitmentRoutes";
// import ReviewsRoutes from "../reviews/router"
// import StockRoutes from "../stock/router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main-index',
            component: MainIndex
        },
        ...FinanceRoutes,
        ...TimeRoutes,
        ...PerformanceRoutes,
        ...RecruitmentRoutes,
        // ...ReviewsRoutes,
        // ...StockRoutes
    ]
})

export default router
