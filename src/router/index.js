import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { auth } from '../firebase'
import LoginForm from '@/views/LoginForm'
import RegisterForm from '@/views/RegisterForm'

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true // Route requires authentication
    }
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: RegisterForm
  }
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard to check authentication status before navigating
router.beforeEach((to, from, next) => {
  // If user is trying to access login page but is already authenticated, redirect to home
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  // If the route requires authentication and user is not authenticated, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  // If all checks pass, continue with navigation
  next();
})

export default router
