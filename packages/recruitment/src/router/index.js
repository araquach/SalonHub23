import { createRouter, createWebHistory } from 'vue-router'
import RecruitmentRoutes from "../router/recruitmentRoutes"
import RecruitmentIndex from "../front/views/RecruitmentIndex.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'performance-index',
      component: RecruitmentIndex
    },
    ...RecruitmentRoutes
  ]
})

export default router
