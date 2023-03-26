<template>
  <div class="w-full container mx-auto">
    <div class="py-2 px-4 bg-sky-600 text-white rounded shadow">
      <font-awesome class="mr-1" :icon="['fa', 'info-circle']" />
      Study Case Chat
    </div>
    <div class="py-2 px-4 bg-orange-600 text-white rounded shadow mt-2">
      <font-awesome class="mr-1" :icon="['fa', 'info-circle']" />
      On Development
    </div>
    <div class="chat-wrapper max-w-6xl mx-auto flex mt-8">
      <div class="px-2 flex">
        <div class="bg-slate-100 p-4 rounded-lg w-60 shadow">
          <v-button class="w-full" variant="primary-outlined"
            ><font-awesome :icon="['fa', 'plus']" /> Chat Baru</v-button
          >
        </div>
      </div>
      <div class="shadow bg-slate-100 px-4 rounded-lg max-h-max w-full relative pt-8">
        <transition name="slide-fade" mode="out-in">
          <div v-if="quote.isLoading.value && quote.data.value.length <= 0">Sabar...</div>
          <div v-else>
            <div class="whitespace-pre-wrap text-slate-800">{{ quote.data.value.join('') }}</div>
          </div>
        </transition>

        <div class="relative h-full">
          <div
            v-for="item in chatDemo"
            class="pt-4 flex w-full"
            :class="[item.role == 'assistant' ? '' : 'justify-end']"
          >
            <div
              class="max-w-md py-2 px-4 rounded-lg shadow"
              :class="[item.role == 'assistant' ? 'bg-blue-200' : 'bg-green-200']"
            >
              {{ item.message }}
            </div>
          </div>
          <div class="absolute bottom-5 w-full flex place-items-center">
            <textarea
              class="p-1 px-3 w-full outline-none text-base shadow focus:shadow-xl rounded-lg"
              placeholder="Tuliskan Chat..."
              type="text"
            />
            <div
              class="grid place-items-center px-5 text-sky-600 cursor-pointer hover:text-sky-400"
            >
              <font-awesome :icon="['fa', 'paper-plane']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStream } from '@/utils/api.utils'
import { onMounted, onUnmounted, ref } from 'vue'

const quote = useStream({ endpoint: '/chat' })
const timeout = ref<number | null>(null)

const chatDemo = [
  {
    role: 'assistant',
    message: 'Halo, Selamat datang ada yang bisa saya bantu?'
  },
  {
    role: 'user',
    message: 'Ya, bicara dengan saya dengan bahasa kucing, kamu jawab meow meow aja pokoknya'
  },
  {
    role: 'assista',
    message: 'meoowww'
  }
]

const recursiveQuote = async () => {
  await quote.execute()
  timeout.value = setTimeout(() => {
    recursiveQuote()
  }, quote.data.value.length * 200)
}

onMounted(() => {
  //   recursiveQuote()
})

onUnmounted(() => {
  clearTimeout(timeout.value ?? undefined)
})
</script>
<style>
.card {
  /* width: 400px; */
  min-height: 250px;
  background: rgba(255, 255, 255, 0.15);

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1rem;
  padding: 1.5rem;
}

.chat-wrapper {
  height: calc(100vh - 14rem);
}
</style>
