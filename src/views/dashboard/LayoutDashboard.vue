<template>
  <div class="sidebar-admin pl-5 w-60 z-10 h-full py-4 fixed">
    <div class="left-5 shadow-md bg-white h-full rounded-2xl pt-4 overflow-auto">
      <h3 class="p-4 text-lg font-bold">🎉 GPT Playground</h3>
      <hr class="my-2" />
      <div v-for="(parent, i) in sidebar">
        <div class="text-lg font-bold px-4 pb-1 pt-4" v-if="parent.header">{{ parent.header }}</div>
        <div
          class="hover:bg-slate-200 hover:shadow-inner block transition-all"
          v-for="(item, i) in parent.children"
        >
          <router-link
            v-if="item.path"
            :to="item.path"
            :key="i"
            class="sidebar-route cursor-pointer block w-full h-full px-4 py-2"
          >
            {{ item.title }}
          </router-link>
          <div v-else class="px-4 py-2">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 px-12 pb-24 panel-container min-h-screen">
    <router-view></router-view>

    <div
      class="fixed bottom-3 p-1 bg-slate-700 rounded w-full text-xs text-center max-w-sm text-white left-1/2 -translate-x-1/2"
    >
      Made with 💖 by <a href="https://github.com/dimar-hanung" class="underline">Dimar</a> | Feel
      free to
      <a href="https://github.com/dimar-hanung/GPT-Playground-FE" class="underline">contribute</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = [
  {
    header: '',
    children: [
      {
        title: 'Dashboard',
        path: '/dashboard'
      }
    ]
  },
  {
    header: 'Basic',
    children: [
      {
        title: 'Quote',
        path: '/dashboard/quote'
      },
      {
        title: 'Quotes',
        path: '/dashboard/quotes'
      }
    ]
  },
  {
    header: 'Medium',
    children: [
      {
        title: 'Quote (Stream)',
        path: '/dashboard/quote-stream'
      },
      {
        title: 'Penilaian Essay',
        path: '/dashboard/penilaian-essay'
      },
      {
        title: 'Chat (Coming Soon)',
        path: '/dashboard/chat'
      }
    ]
  },
  {
    header: 'Advanced',
    children: [
      {
        title: 'Coming Soon',
        path: ''
      }
    ]
  },
  {
    header: 'Lain lain',
    children: [
      {
        title: 'Login Page',
        path: '/login'
      }
    ]
  }
]
</script>

<style scoped>
.panel-container {
  background: linear-gradient(45deg, #98d9ff, #fdff754a);
}

.sidebar-route.router-link-exact-active {
  @apply bg-sky-100;
}

.sidebar-admin {
  transform: translateX(calc(-100%));
  transition: all ease 0.4s;
  left: 1.25rem;
}

.sidebar-admin:hover {
  left: 0;
  transform: translateX(0px);
}
</style>
