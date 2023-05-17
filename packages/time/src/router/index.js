import { createRouter, createWebHistory } from 'vue-router'
import TimeRoutes from "../router/timeRoutes"
import TimeIndex from '../front/views/TimeIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'time-index',
      component: TimeIndex
    },
    ...TimeRoutes
  ]
})

export default router