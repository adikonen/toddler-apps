import { createRouter, createWebHistory } from 'vue-router'
import { animalSwipeRoutes } from '@/domain/animal-swipe/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    ...animalSwipeRoutes
  ]
})

export default router
