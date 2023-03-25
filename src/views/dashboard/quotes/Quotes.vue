<template>
  <div class="container mx-auto mt-8">
    <div class="py-2 px-4 bg-sky-600 text-white rounded shadow">
      <font-awesome class="mr-1" :icon="['fa', 'info-circle']" />
      Integrasi GPT 3, dengan payload dan response structured data
    </div>

    <label class="block mt-4" for="">Jumlah Quote <span class="text-red-600">*</span></label>
    <input
      type="text"
      v-model="count"
      :max="10"
      class="p-2 rounded shadow outline-none focus:shadow-xl mt-1"
    />
    <v-button :disabled="count > 10" class="mt-4 px-8" @click="getBasicQuotes"
      >Buat {{ count }} quotes</v-button
    >
    <div class="text-red-700 mt-2" v-if="count > 10">Maksimal 10 Quotes</div>
    <transition name="slide-fade" mode="out-in">
      <div v-if="isLoading" class="text-center">
        <font-awesome class="mr-1" :icon="['fa', 'spinner']" spin />
        Sabar yaa...
      </div>
    </transition>
    <div
      v-for="item in quotes"
      class="mt-4 p-4 bg-sky-100 rounded-xl shadow-xltext-lg font-bold text-slate-700 grid place-items-center"
    >
      <div>{{ item?.quote }}</div>
      <hr class="my-2 border-slate-300 w-full" />
      <div class="text-pink-400 text-right">{{ item?.anime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Quote {
  quote: string
  anime: string
}

import { onMounted, ref } from 'vue'
const count = ref(3)
const quotes = ref<Array<Quote>>([])
const isLoading = ref(false)
const getBasicQuotes = async () => {
  isLoading.value = true
  const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/gpt-quotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      count: count.value
    })
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err))
  isLoading.value = false
  console.log('response', response)
  quotes.value = JSON.parse(response?.data)
  console.log('quotes', quotes.value)

  return response
}

onMounted(() => {
  getBasicQuotes()
})
</script>
