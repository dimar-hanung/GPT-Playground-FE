<template>
  <div class="absolute w-screen h-screen overflow-hidden">
    <BlobGradient
      :key="i + 'BLOB_BG'"
      class="absolute h-96 w-96"
      :show-delay="i * 100 + 100"
      v-for="(item, i) in blobConfig"
      :style="{
        left: `${item.left}%`,
        top: `${item.top}%`
      }"
    />
  </div>
  <div class="bg-linear min-h-screen p-5">
    <div class="flex-wrap sm:flex-nowrap flex w-full container mx-auto">
      <div class="w-2/3 flex-grow p-2">
        <div class="card max-h-max text-2xl grid place-items-center font-bold">
          <transition name="slide-fade" mode="out-in">
            <div v-if="quote.isLoading.value && quote.data.value.length <= 0">Sabar...</div>
            <div v-else>
              <div class="whitespace-pre-wrap text-slate-800">{{ quote.data.value.join('') }}</div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="slide-fade" mode="out-in">
        <div class="w-1/3 flex-grow p-2 min-w-[320px]" v-if="isLoginForm">
          <div class="card shadow">
            <h1 class="title font-bold text-slate-700">💯 GPT Playground</h1>
            <input
              type="text"
              class="outline-none p-2 w-full block bg-transparent border-b-slate-500 border-b placeholder-slate-800"
              placeholder="Email"
            />
            <input
              type="text"
              class="outline-none p-2 w-full block bg-transparent border-b-slate-500 border-b mt-4 placeholder-slate-800"
              placeholder="Passowrd"
            />
            <div class="w-full flex justify-end">
              <button class="mt-8 bg-blue-800 py-2 w-full rounded-lg px-8 text-white">Login</button>
            </div>
            <hr class="my-4 border-slate-400" />
            <div class="text-center">
              Belum punya akun?
              <span @click="isLoginForm = false" class="text-blue-800 cursor-pointer">Daftar</span>
            </div>
          </div>
          <!-- <div class="blob"></div> -->
        </div>
        <div class="w-1/3 flex-grow p-2 min-w-[320px]" v-else>
          <div class="card shadow">
            <h1 class="title font-bold text-slate-700">📝 Registrasi Akun</h1>
            <input
              type="text"
              class="outline-none p-2 w-full block bg-transparent border-b-slate-500 border-b placeholder-slate-800"
              placeholder="Email"
            />
            <input
              type="text"
              class="outline-none p-2 w-full block bg-transparent border-b-slate-500 border-b mt-4 placeholder-slate-800"
              placeholder="Passowrd"
            />
            <div class="w-full flex justify-end">
              <button class="mt-8 bg-blue-800 py-2 w-full rounded-lg px-8 text-white">
                Registrasi
              </button>
            </div>
            <hr class="my-4 border-slate-400" />
            <div class="text-center">
              Sudah punya akun?
              <span @click="isLoginForm = true" class="text-blue-800 cursor-pointer">Login</span>
            </div>
          </div>
          <!-- <div class="blob"></div> -->
        </div>
      </transition>
      <!-- <div v-html="svg"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStream } from '@/utils/api.utils'
import { onMounted, ref } from 'vue'
import BlobGradient from './BlobGradient.vue'
const quote = useStream({})
const isLoginForm = ref(true)
const blobConfig = [
  { left: 0, top: 0 },
  {
    left: 80,
    top: 0
  },
  {
    left: 30,
    top: 50
  },
  {
    left: 90,
    top: 50
  },
  {
    left: 55,
    top: 25
  }
]

const recursiveQuote = async () => {
  await quote.execute()
  setTimeout(() => {
    recursiveQuote()
  }, quote.data.value.length * 200)
  //   setTimeout(() => {
  //     if (quote.isLoading.value == false) {
  //     }
  //   }, quote.data.value.length * 500)
}

onMounted(() => {
  recursiveQuote()
})
</script>
<style>
path {
  transition: all 0.3s;
}

.bg-linear {
  background: linear-gradient(45deg, #98d9ff, #fdff754a);
}

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

.title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.btn {
  background: none;
  border: none;
  text-align: center;
  font-size: 1rem;
  color: whitesmoke;
  /* background-color: #fa709a; */
  padding: 0.8rem 1.8rem;
  border-radius: 2rem;
  cursor: pointer;
}

/**
 * vue flip transition 
 */
/* Transisi untuk masuk */
.flip-enter-active {
  animation: flip-in 0.5s ease-in-out both;
}

/* Transisi untuk keluar */
.flip-leave-active {
  animation: flip-out 0.5s ease-in-out both;
}

@keyframes flip-in {
  0% {
    transform: rotateX(180deg);
    filter: blur(10px);
  }
  100% {
    transform: rotateX(0);
    filter: blur(0);
  }
}

@keyframes flip-out {
  0% {
    transform: rotateX(0);
    filter: blur(0);
  }
  100% {
    transform: rotateX(180deg);
    filter: blur(10px);
  }
}
</style>
