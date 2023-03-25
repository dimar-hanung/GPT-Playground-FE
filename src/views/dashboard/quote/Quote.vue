<template>
  <div class="container mx-auto mt-8">
    <div class="py-2 px-4 bg-sky-600 text-white rounded shadow">
      <font-awesome class="mr-1" :icon="['fa', 'info-circle']" />
      Basic Integrasi GPT 3, menggunakan text-davinci-003
    </div>
    <div
      class="mt-8 p-8 bg-sky-100 rounded-xl shadow-xl text-center text-xl font-bold text-slate-700 min-h-[200px] grid place-items-center"
    >
      <transition name="slide-fade" mode="out-in">
        <div v-if="isLoading" class="text-center">
          <font-awesome class="mr-1" :icon="['fa', 'spinner']" spin />
          Sabar yaa...
        </div>
        <div v-else>{{ quote }}</div>
      </transition>
    </div>
    <v-button class="mt-4 px-8" @click="getBasicQuotes">Cari Lagi</v-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const quote = ref('')
const isLoading = ref(false)
const getBasicQuotes = async () => {
  isLoading.value = true
  const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/gpt-basic-quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err))
  isLoading.value = false
  console.log('response', response)
  quote.value = response?.text

  return response
}

onMounted(() => {
  getBasicQuotes()
})
</script>
