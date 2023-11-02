import type { RouteRecordRaw } from 'vue-router'

export const animalSwipeRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/animal-swipe',
    name: 'animal-swipe',
    component: () => import('@/domain/animal-swipe/views/IndexView.vue')
  },
  {
    path: '/animal-swipe/:category_id/show/:id',
    name: 'animal-swipe.show',
    component: () => import('@/domain/animal-swipe/views/ShowView.vue')
  }
]
