import {createRouter, createWebHistory} from 'vue-router';
import MainIndex from '../front/views/MainIndex.vue';
import FinanceRoutes from "finance/src/router/financeRoutes";
import TimeRoutes from "time/src/router/timeRoutes";
import AdminRoutes from "./adminRoutes"
import PerformanceRoutes from "performance/src/router/performanceRoutes";
import RecruitmentRoutes from "recruitment/src/router/recruitmentRoutes";
import AuthRoutes from "auth/src/router/authRoutes";
import MainDashboard from "../front/views/MainDash.vue";
import { useAuthStore } from 'auth/src/stores/authStore';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainIndex,
            children: [
                {
                    path: '',
                    name: 'main-dashboard',
                    component: MainDashboard,
                    meta: {
                        requiresAuth: true
                    }
                },
                ...TimeRoutes,
                ...FinanceRoutes,
                ...PerformanceRoutes,
                ...RecruitmentRoutes,
                ...AuthRoutes,
                ...AdminRoutes
            ]
        },

    ]
})

router.beforeEach((to, from, next) => {
    const store = useAuthStore();
    if (to.matched.some(record => record.meta.requiresAuth) && !store.user) {
        next('/auth/login');
    } else {
        next();
    }
});

export default router
