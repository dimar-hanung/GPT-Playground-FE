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
        }
      ]
    }
  ]
})

export default router
