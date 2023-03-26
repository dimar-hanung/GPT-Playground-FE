import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'LayoutDashboard',
      component: () => import('../views/dashboard/LayoutDashboard.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/dashboard/Dashboard.vue')
        },
        {
          path: 'quote',
          name: 'Quote',
          component: () => import('../views/dashboard/quote/Quote.vue')
        },
        {
          path: 'quote-stream',
          name: 'QuoteStream',
          component: () => import('../views/dashboard/quote-stream/QuoteStream.vue')
        },
        {
          path: 'quotes',
          name: 'Quotes',
          component: () => import('../views/dashboard/quotes/Quotes.vue')
        },

        {
          path: 'penilaian-essay',
          name: 'PenilaianEssay',
          component: () => import('../views/dashboard/penilaian-essay/PenilaianEssay.vue')
        },
        {
          path: 'chat',
          name: 'Chat',
          component: () => import('../views/dashboard/chat/Chat.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard/quote'
    }
  ]
})

export default router
