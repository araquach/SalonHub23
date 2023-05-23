import { createRouter, createWebHistory } from 'vue-router'
import PerformanceRoutes from "../router/performanceRoutes"
import PerformanceIndex from "../front/views/PerformanceIndex.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'performance-index',
      component: PerformanceIndex
    },
    ...PerformanceRoutes
  ]
})

export default router
