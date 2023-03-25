<template>
  <div class="container mx-auto">
    <div>
      <div class="py-2 px-4 bg-sky-600 text-white rounded shadow">
        <font-awesome class="mr-1" :icon="['fa', 'info-circle']" />
        Integrasi GPT 3, study case penilaian essay
      </div>

      <label for="" class="p-4 rounded-t bg-white block mt-8"
        >Pertanyaan <span class="text-red-700">*</span></label
      >
      <textarea
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full min-h-[200px] bg-blue-50"
        placeholder="Pertanyaan"
        v-model="form.pertanyaan"
        wrap="hard"
      ></textarea>

      <label for="" class="p-4 rounded-t bg-white block mt-8"
        >Jawaban Benar <span class="text-red-700">*</span></label
      >
      <textarea
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full min-h-[200px] bg-blue-50"
        wrap="hard"
        placeholder="Jawaban Benar"
        v-model="form.jawabanBenar"
      ></textarea>

      <label for="" class="p-4 rounded-t bg-white block mt-8"
        >Jawaban Mahasiswa <span class="text-red-700">*</span></label
      >
      <textarea
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full min-h-[200px] bg-blue-50"
        wrap="hard"
        placeholder="Jawaban Mahasisawa"
        v-model="form.jawabanMahasiswa"
      ></textarea>

      <v-button class="mt-4 px-8" @click="getChat" :loading="isLoadingStream">Nilai</v-button>

      <div class="p-4 rounded-t bg-white mt-8 flex justify-between">
        <div>Penilaian AI ( 1 - 10 ):</div>
        <div class="text-xl text-sky-600">
          <font-awesome class="mr-2 cursor-pointer" :icon="['fa', 'thumbs-up']"></font-awesome>
          <font-awesome
            class="mr-2 cursor-pointer rotate-180"
            :icon="['fa', 'thumbs-up']"
          ></font-awesome>
        </div>
      </div>
      <div
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full bg-blue-50"
      >
        <div class="whitespace-pre-wrap">{{ scoreStream.join('') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      question: '',
      form: {
        pertanyaan: 'Sebutkan isi dari pancasila',
        jawabanBenar: `Pancasila ada 5: 
      1. Ketuhanan yang maha esa
      2. Kemanusiaan yang adil dan beradap
      3. persatuan indonesia
      4. kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan
      5 .keadilan sosial bagi seluruh rakyat indonesia`,
        jawabanMahasiswa: `1. Ketuhanan yang maha esa
      2. Kemanusiaan yang adil dan beradap
      3. persatuan indonesia
      4. kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan
      5 .keadilan sosial bagi seluruh rakyat indonesia
      6. kemakmuran yang sejahtera`
      },
      answer: [],
      isLoading: false,
      scoreStream: [] as string[],
      isLoadingStream: false
    }
  },
  methods: {
    async getChat() {
      this.scoreStream = []
      this.isLoadingStream = true
      // Query your endpoint
      const res = await fetch('https://ut-gpt.azurewebsites.net/chat-bot3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          pertanyaan: this.form.pertanyaan,
          jawabanBenar: this.form.jawabanBenar,
          jawabanMahasiswa: this.form.jawabanMahasiswa
        })
      })

      // Create a reader for the response body
      const reader = res?.body?.getReader()
      // Create a decoder for UTF-8 encoded text
      const decoder = new TextDecoder('utf-8')
      let result = ''
      // Function to read chunks of the response body
      const readChunk: any = async () => {
        return reader?.read().then(({ value, done }) => {
          if (!done) {
            const dataString = decoder.decode(value)
            console.log(dataString.slice(0, 10))
            let data
            try {
              // console.log(dataString?.split("data: ")?.[1]);
              data = JSON.parse(dataString?.split('data: ')?.[1])
              // console.log(data);
            } catch {
              data = { text: '' }
            }
            // console.log(data?.choices?.[0]?.text);
            this.scoreStream.push(data?.choices?.[0]?.text ?? '')

            if (data.error) {
              console.error('Error while generating content: ' + data.message)
            } else {
              result = data.streamHead ? data.text : result + data.text
              return readChunk()
            }
          } else {
            console.log('done')
            this.isLoadingStream = false
          }
        })
      }

      await readChunk()
    }
  }
}
</script>
