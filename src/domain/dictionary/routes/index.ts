import type { RouteRecordRaw } from 'vue-router'

export const dictionaryRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/dictionary',
    name: 'dictionary',
    component: () => import('@/domain/dictionary/views/IndexView.vue')
  },
  {
    path: '/dictionary/:category_type/show',
    name: 'dictionary.show',
    props: true,
    component: () => import('@/domain/dictionary/views/ShowView.vue')
  }
]
