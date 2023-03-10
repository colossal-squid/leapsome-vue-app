import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import CreateFeedbackView from '../views/CreateFeedbackView.vue'
import FeedbackView from '../views/FeedbackView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserView
    },
    {
      path: '/feedback/:feedbackId',
      name: 'feedback',
      component: FeedbackView
    },
    {
      path: '/create-feedback/:userId?',
      name: 'create-feedback',
      component: CreateFeedbackView
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView
    }
  ]
})

export default router
