import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from "../router/authRoutes"
import AuthIndex from '../front/views/AuthIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth-index',
      component: AuthIndex
    },
    ...AuthRoutes
  ]
})

export default router
