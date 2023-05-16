import { createRouter, createWebHistory } from 'vue-router'
import FinanceRoutes from "finance/src/router/finance"
import FinanceIndex from '../front/views/FinanceIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-index',
      component: FinanceIndex
    },
    ...FinanceRoutes
  ]
})

export default router
