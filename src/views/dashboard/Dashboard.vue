<template>
  <div class="container mx-auto mt-8">
    <div class="menu-clue font-bold max-w-max">
      <font-awesome class="text-sky-600" :icon="['fa', 'arrow-left']" /> Menu
    </div>
    <div class="bg-slate-100 p-4 mt-8 shadow rounded-xl">
      <h3 class="text-2xl font-bold">Web apakah ini ? 🤔</h3>
      <hr class="my-4" />
      <div class="desc-point">
        👉 Jadi intinya ini berisi hello-world dan study case untuk integrasi dengan gpt dari
        openai.
      </div>
      <div class="desc-point">
        👉 Tujuan nya untuk mempermudah untuk mempelajari gpt dengan praktik langsung.
      </div>
      <div class="desc-point">
        👉 Big thanks untuk yang bantu kontribusi.
        <span class="text-green-500 font-bold">walau cuma fix typo gpp banget wkwk</span>
      </div>

      <h3 class="text-2xl font-bold mt-8">Stack apa aja yang digunain ? 😐</h3>
      <hr class="my-4" />
      <div class="desc-point">👉 Vue 3</div>
      <div class="desc-point">👉 Tailwind CSS</div>
      <div class="desc-point">👉 Nest JS</div>
      <div class="desc-point">👉 OpenAI</div>
    </div>

    <div class="flex place-items-center mt-8 p-1 bg-white shadow rounded-lg hover:bg-sky-50">
      <div class="px-2 text-lg">💡</div>
      <div>
        Tertarik? mau sharing boleh? boleh dong wkwk, nanti bisa explore & diskusi bareng via
        virtual meet, bisa kontak ke
        <a href="https://www.linkedin.com/in/dimar-hanung/" class="text-blue-500 font-bold"
          >linkedin (dimar hanung)</a
        >
      </div>
    </div>

    <div class="flex place-items-center mt-8 p-1 bg-orange-100 shadow rounded-lg hover:bg-sky-50">
      <div class="px-2 text-lg">😭</div>
      <div>Kalau web nya ngga work maap yaa, berati saldo sudah terkuras wkwk</div>
    </div>

    <div class="bg-slate-100 p-4 mt-8 shadow rounded-xl">
      <h3 class="text-2xl font-bold">HALO GPT Bisa jelasin lagi dalem bentuk puisi ? 🤧</h3>
      <hr class="mt-4" />
      <div class="whitespace-pre-wrap text-lg">
        {{ quote.data.value.join('') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStream } from '@/utils/api.utils'
import { onMounted } from 'vue'

const quote = useStream({ endpoint: '/gpt-puisi' })
onMounted(() => {
  quote.execute()
})
</script>

<style>
.menu-clue {
  animation: left-to-right 1s ease-in-out infinite alternate;
}

@keyframes left-to-right {
  0% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0px);
  }
}
.desc-point {
  @apply p-1 bg-white shadow mt-1 rounded hover:bg-sky-50;
}
</style>
