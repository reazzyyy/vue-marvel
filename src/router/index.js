import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ComicsPage from '../views/ComicsPage.vue'
import SingleComicPage from '../views/SingleComicPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/comics',
      name: 'comics',

      component: ComicsPage,
    },
    {
      path: '/comics/:id',
      name: 'singleComic',
      component: SingleComicPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundPage,
    },
  ],
})

export default router
