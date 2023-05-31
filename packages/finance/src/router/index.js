import { createRouter, createWebHistory } from 'vue-router'
import FinanceRoutes from "./financeRoutes"
import FinanceIndex from '../front/views/FinanceIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'finance-index',
      component: FinanceIndex
    },
    ...FinanceRoutes
  ]
})

export default router
