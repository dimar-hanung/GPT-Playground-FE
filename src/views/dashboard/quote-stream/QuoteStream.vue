<template>
  <div class="w-full container mx-auto">
    <div class="py-2 px-4 bg-sky-600 text-white rounded shadow">
      <font-awesome class="mr-1" :icon="['fa', 'info-circle']" />
      Integrasi GPT 3, dengan stream
    </div>
    <div class="card max-h-max text-2xl grid place-items-center font-bold">
      <transition name="slide-fade" mode="out-in">
        <div v-if="quote.isLoading.value && quote.data.value.length <= 0">Sabar...</div>
        <div v-else>
          <div class="whitespace-pre-wrap text-slate-800">{{ quote.data.value.join('') }}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStream } from '@/utils/api.utils'
import { onMounted, onUnmounted, ref } from 'vue'

const quote = useStream({})
const timeout = ref<number | null>(null)

const recursiveQuote = async () => {
  await quote.execute()
  timeout.value = setTimeout(() => {
    recursiveQuote()
  }, quote.data.value.length * 200)
}

onMounted(() => {
  recursiveQuote()
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
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1rem;
  padding: 1.5rem;
  z-index: 10;
  /* color: whitesmoke; */
}
</style>
